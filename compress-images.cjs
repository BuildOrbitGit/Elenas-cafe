const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const htmlPath = path.resolve("index.html");
let html = fs.readFileSync(htmlPath, "utf8");
const matches = [...new Set(html.match(/data:image\/(?:webp|jpeg|jpg|png);base64,[A-Za-z0-9+/=]+/g) || [])];

if (!matches.length) {
  console.log("No embedded images found.");
  process.exit(0);
}

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "coffee-loft-chrome-"));
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-software-rasterizer",
  "--disable-dev-shm-usage",
  "--no-sandbox",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "about:blank",
]);

let seq = 0;
const pending = new Map();

function waitForWs() {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timed out waiting for Chrome DevTools endpoint")), 15000);
    chrome.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      const match = text.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) {
        clearTimeout(timer);
        resolve(match[1]);
      }
    });
    chrome.on("exit", (code) => reject(new Error(`Chrome exited early with code ${code}`)));
  });
}

function send(ws, method, params, sessionId) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params, sessionId }));
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
  });
}

function cleanup() {
  chrome.kill();
  fs.rmSync(profile, { recursive: true, force: true });
}

(async () => {
  const wsUrl = await waitForWs();
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    }
  });

  const target = await send(ws, "Target.createTarget", { url: "about:blank" });
  const attached = await send(ws, "Target.attachToTarget", { targetId: target.targetId, flatten: true });
  const sessionId = attached.sessionId;

  const expression = `
    (async () => {
      const images = ${JSON.stringify(matches)};
      function compress(src) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const maxSide = 420;
            const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
            const w = Math.max(1, Math.round(img.naturalWidth * scale));
            const h = Math.max(1, Math.round(img.naturalHeight * scale));
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL("image/jpeg", 0.45));
          };
          img.onerror = () => resolve(src);
          img.src = src;
        });
      }
      const result = [];
      for (const src of images) result.push([src, await compress(src)]);
      return JSON.stringify(result);
    })()
  `;

  const evaluated = await send(ws, "Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  }, sessionId);

  const pairs = JSON.parse(evaluated.result.value);
  for (const [from, to] of pairs) {
    html = html.split(from).join(to);
  }
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log(`Compressed ${pairs.length} unique embedded images.`);
  console.log(`New size: ${fs.statSync(htmlPath).size} bytes`);
  cleanup();
})().catch((error) => {
  cleanup();
  console.error(error);
  process.exit(1);
});
