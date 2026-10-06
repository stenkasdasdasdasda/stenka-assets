const hosts = ['https://stenka.furry.by', 'https://dns.furry.by'];
const status = document.getElementById('status');
const retry = document.getElementById('retry');
const tg = window.Telegram?.WebApp;
const launchParams = new URLSearchParams(location.hash.slice(1));
// Proofs, the browser binding and sessions stay in memory, never URLs or storage.
const initData = launchParams.get('tgWebAppData') || tg?.initData || '';
const loginNonce = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) =>
  b.toString(16).padStart(2, '0'),
).join('');
const requested = new URLSearchParams(location.search).get('return') || '/app';
const destination =
  /^\/app(?:\/|[?#]|$)/.test(requested) && !requested.includes('\\') ? requested : '/app';
const frames = new Map();
const sessions = new Map();
let selected = null;
let connected = false;
let run = 0;
let backupTimer, failureTimer, clientTimer;
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
try {
  tg?.ready();
  tg?.expand();
} catch {}

function snapshot() {
  const insets = {};
  for (const side of ['top', 'right', 'bottom', 'left']) {
    insets['safe-' + side] = Math.min(200, Math.max(0, Number(tg?.safeAreaInset?.[side]) || 0));
    insets['content-' + side] = Math.min(
      200,
      Math.max(0, Number(tg?.contentSafeAreaInset?.[side]) || 0),
    );
  }
  return {
    initData,
    loginNonce,
    sessionToken: sessions.get(selected?.host) || '',
    platform: tg?.platform || launchParams.get('tgWebAppPlatform') || 'unknown',
    version: tg?.version || launchParams.get('tgWebAppVersion') || '0',
    colorScheme: tg?.colorScheme === 'light' ? 'light' : 'dark',
    isFullscreen: !!tg?.isFullscreen,
    insets,
  };
}
function clearTimers() {
  clearTimeout(backupTimer);
  clearTimeout(failureTimer);
  clearTimeout(clientTimer);
}
function discard(record) {
  frames.delete(record.frame.contentWindow);
  record.frame.remove();
}
function fail(message) {
  clearTimers();
  for (const record of frames.values()) discard(record);
  selected = null;
  connected = false;
  status.textContent = message;
  document.getElementById('loading').hidden = false;
  retry.hidden = false;
}
function choose(record) {
  if (selected && selected !== record) return false;
  if (!selected) {
    selected = record;
    clearTimers();
    for (const other of frames.values()) if (other !== record) discard(other);
    status.textContent = 'Загружаем Стенку…';
    clientTimer = setTimeout(() => {
      if (!connected) fail('Не удалось загрузить приложение. Попробуй ещё раз.');
    }, 15000);
  }
  return true;
}
function openFrame(host) {
  const frame = document.createElement('iframe');
  frame.hidden = true;
  frame.title = 'Фурри Стенка';
  frame.referrerPolicy = 'no-referrer';
  frame.allow = 'clipboard-write';
  frame.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups';
  const target = new URL(destination, host);
  target.searchParams.set('launcher', 'github');
  frame.src = target.href;
  document.body.append(frame);
  frames.set(frame.contentWindow, { frame, host });
}
async function browserStart(attempt) {
  // Ordinary browser visits need no Telegram proof or iframe session.
  for (const host of hosts) {
    try {
      const response = await fetch(host + '/connection-check', {
        credentials: 'omit',
        cache: 'no-store',
        redirect: 'error',
        signal: AbortSignal.timeout(1000),
      });
      const data = await response.json();
      if (attempt !== run) return;
      if (response.ok && data.ok && data.service === 'stenka') {
        location.replace(host + destination);
        return;
      }
    } catch {}
  }
  if (attempt === run) fail('Не удалось подключиться. Попробуй ещё раз чуть позже.');
}
function start() {
  const attempt = ++run;
  clearTimers();
  for (const record of frames.values()) discard(record);
  selected = null;
  connected = false;
  retry.hidden = true;
  document.getElementById('loading').hidden = false;
  status.textContent = 'Подключаемся к Стенке…';
  if (!initData) {
    void browserStart(attempt);
    return;
  }
  // Start VDS after 1 second without discarding a still-useful primary request.
  // Only the winning document ever receives Telegram proof and credentials.
  openFrame(hosts[0]);
  backupTimer = setTimeout(() => {
    if (attempt !== run || selected) return;
    status.textContent = 'Пробуем запасной вход…';
    openFrame(hosts[1]);
    retry.hidden = false;
  }, 1000);
  failureTimer = setTimeout(() => {
    if (attempt === run && !selected) fail('Не удалось подключиться. Попробуй ещё раз чуть позже.');
  }, 30000);
}
window.addEventListener('message', (event) => {
  const record = frames.get(event.source);
  if (
    !record ||
    event.origin !== record.host ||
    !event.data ||
    event.data.channel !== 'stenka-launcher-v1'
  )
    return;
  const data = event.data;
  if (data.type === 'document-ready') {
    choose(record);
  } else if (data.type === 'ready' && choose(record)) {
    connected = true;
    clearTimers();
    retry.hidden = true;
    record.frame.contentWindow.postMessage(
      { channel: 'stenka-launcher-v1', type: 'init', ...snapshot() },
      record.host,
    );
    record.frame.hidden = false;
    document.getElementById('loading').hidden = true;
  } else if (
    selected === record &&
    connected &&
    data.type === 'session' &&
    typeof data.sessionToken === 'string'
  ) {
    if (/^[a-f0-9]{64}$/.test(data.sessionToken)) sessions.set(record.host, data.sessionToken);
    else if (data.sessionToken === '') sessions.delete(record.host);
  } else if (
    selected === record &&
    connected &&
    data.type === 'native' &&
    ['ready', 'expand', 'exitFullscreen'].includes(data.method)
  ) {
    try {
      tg?.[data.method]?.();
    } catch {}
  }
});
tg?.onEvent?.('themeChanged', () => {
  if (connected && selected)
    selected.frame.contentWindow.postMessage(
      {
        channel: 'stenka-launcher-v1',
        type: 'theme',
        colorScheme: tg.colorScheme === 'light' ? 'light' : 'dark',
      },
      selected.host,
    );
});
retry.addEventListener('click', start);
start();
