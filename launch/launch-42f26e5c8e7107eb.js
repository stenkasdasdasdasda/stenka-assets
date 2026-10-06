const hosts = ['https://stenka.furry.by', 'https://dns.furry.by'];
const status = document.getElementById('status');
const retry = document.getElementById('retry');
const tg = window.Telegram?.WebApp;
const launchParams = new URLSearchParams(location.hash.slice(1));
let currentFrame = null;
let selected = '';
let connected = false;
let run = 0;
let readyTimer;
let clientTimer;
const connectionDeadline = 3000;
// The Telegram proof remains in memory. Never put it in a URL, storage or logs.
const initData = tg?.initData || launchParams.get('tgWebAppData') || '';
const requested = new URLSearchParams(location.search).get('return') || '/app';
const destination = /^\/app(?:\/|[?#]|$)/.test(requested) && !requested.includes('\\') ? requested : '/app';
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
try { tg?.ready(); tg?.expand(); } catch {}

function snapshot() {
  const insets = {};
  for (const side of ['top', 'right', 'bottom', 'left']) {
    insets['safe-' + side] = Math.min(200, Math.max(0, Number(tg?.safeAreaInset?.[side]) || 0));
    insets['content-' + side] = Math.min(200, Math.max(0, Number(tg?.contentSafeAreaInset?.[side]) || 0));
  }
  return { initData, platform: tg?.platform || launchParams.get('tgWebAppPlatform') || 'unknown',
    version: tg?.version || launchParams.get('tgWebAppVersion') || '0',
    colorScheme: tg?.colorScheme === 'light' ? 'light' : 'dark', isFullscreen: !!tg?.isFullscreen, insets };
}
async function reachable(host, remaining) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), remaining);
  try {
    const response = await fetch(host + '/connection-check', { signal: controller.signal,
      credentials: 'omit', cache: 'no-store', redirect: 'error' });
    const data = await response.json();
    return response.ok && data.ok === true && data.service === 'stenka' && data.probe?.length === 32768;
  } catch { return false; }
  finally { clearTimeout(timeout); }
}
async function start(from = 0) {
  const attempt = ++run;
  connected = false;
  clearTimeout(readyTimer);
  clearTimeout(clientTimer);
  retry.hidden = true;
  currentFrame?.remove(); currentFrame = null;
  document.getElementById('loading').hidden = false;
  for (let index = from; index < hosts.length; index++) {
    const deadline = Date.now() + connectionDeadline;
    status.textContent = index === 0 ? 'Подключаемся к Стенке…' : 'Пробуем запасной вход…';
    if (!await reachable(hosts[index], connectionDeadline)) continue;
    if (attempt !== run) return;
    selected = hosts[index];
    if (!initData) { location.replace(selected + destination); return; }
    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.title = 'Фурри Стенка';
    frame.referrerPolicy = 'no-referrer';
    const target = new URL(destination, selected);
    target.searchParams.set('launcher', 'github');
    frame.src = target.href;
    // No top navigation, popups escaping the sandbox, clipboard or native bridge access.
    frame.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups';
    currentFrame = frame;
    document.body.append(frame);
    readyTimer = setTimeout(() => {
      if (!connected && attempt === run) void start(index + 1);
    }, Math.max(0, deadline - Date.now()));
    return;
  }
  if (attempt !== run) return;
  status.textContent = 'Не удалось подключиться. Попробуй ещё раз чуть позже.';
  retry.hidden = false;
}
window.addEventListener('message', (event) => {
  if (!currentFrame || event.source !== currentFrame.contentWindow || event.origin !== selected ||
      !event.data || event.data.channel !== 'stenka-launcher-v1') return;
  if (event.data.type === 'document-ready' && !connected) {
    clearTimeout(readyTimer);
    clearTimeout(clientTimer);
    status.textContent = 'Загружаем Стенку…';
    // The server is connected. Slow shared GitHub files are not a reason to
    // discard that connection or resend authentication through another host.
    clientTimer = setTimeout(() => {
      if (connected) return;
      currentFrame?.remove(); currentFrame = null;
      status.textContent = 'Не удалось загрузить приложение. Попробуй ещё раз.';
      retry.hidden = false;
    }, 15000);
  } else if (event.data.type === 'ready') {
    connected = true;
    clearTimeout(readyTimer);
    clearTimeout(clientTimer);
    currentFrame.contentWindow.postMessage({ channel: 'stenka-launcher-v1', type: 'init', ...snapshot() }, selected);
    currentFrame.hidden = false;
    document.getElementById('loading').hidden = true;
  } else if (event.data.type === 'native' && connected) {
    const method = event.data.method;
    // Native Telegram methods run only in the original GitHub Mini App origin.
    if (['ready', 'expand', 'exitFullscreen'].includes(method)) {
      try { tg?.[method]?.(); } catch {}
    }
  }
});
tg?.onEvent?.('themeChanged', () => {
  if (connected) currentFrame?.contentWindow?.postMessage({ channel: 'stenka-launcher-v1', type: 'theme',
    colorScheme: tg.colorScheme === 'light' ? 'light' : 'dark' }, selected);
});
retry.addEventListener('click', () => void start());
void start();
