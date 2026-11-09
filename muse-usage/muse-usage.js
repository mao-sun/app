// Muse Usage Widget for Scriptable (iOS)
// 显示：Weekly 剩余 % / 进度条 / 重置倒计时 / 更新时间
// 数据源：把 DATA_URL 改成你自己的 usage.json 地址（GitHub raw / Gist raw 等）
// 图片装饰：三种方式任选一种，改 IMAGE_MODE 即可

// ===== 配置区（只改这里） =====
const DATA_URL = "https://raw.githubusercontent.com/mao-sun/app/main/muse-usage/usage.json";

// 图片模式: "none" | "url" | "file" | "base64"
const IMAGE_MODE = "none";
const IMAGE_URL = "";          // IMAGE_MODE="url" 时填图片直链
const IMAGE_FILENAME = "character.png"; // IMAGE_MODE="file" 时，放 Scriptable 文件夹里的文件名
const IMAGE_BASE64 = "";       // IMAGE_MODE="base64" 时填图片的 base64（不要带 data:image/... 前缀）

// 没网 / 拉不到数据时的兜底（会被真实数据覆盖）
const FALLBACK = { percentLeft: 91, resetsAt: "2026-11-16T04:36:00+08:00", updatedAt: null };
// ===== 配置区结束 =====

async function loadData() {
  try {
    const req = new Request(DATA_URL + "?t=" + Date.now());
    req.timeoutInterval = 10;
    const json = await req.loadJSON();
    if (typeof json.percentLeft === "number") return json;
  } catch (e) {}
  return FALLBACK;
}

async function loadCharacterImage() {
  try {
    if (IMAGE_MODE === "url" && IMAGE_URL) {
      return await new Request(IMAGE_URL).loadImage();
    }
    if (IMAGE_MODE === "file") {
      const fm = FileManager.iCloud();
      const path = fm.joinPath(fm.documentsDirectory(), IMAGE_FILENAME);
      if (fm.fileExists(path)) return fm.readImage(path);
    }
    if (IMAGE_MODE === "base64" && IMAGE_BASE64) {
      const data = Data.fromBase64String(IMAGE_BASE64);
      if (data) return Image.fromData(data);
    }
  } catch (e) {}
  return null;
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const ms = new Date(dateStr).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86400000));
}

function fmtTime(d) {
  const p = n => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const data = await loadData();
const widget = new ListWidget();
widget.backgroundColor = new Color("#17131f");
widget.setPadding(14, 14, 14, 14);

const head = widget.addStack();
head.layoutHorizontally();
const title = head.addText("✦ Muse");
title.font = Font.boldSystemFont(15);
title.textColor = Color.white();
head.addSpacer();
const img = await loadCharacterImage();
if (img) {
  const im = head.addImage(img);
  im.imageSize = new Size(36, 36);
  im.cornerRadius = 8;
}

widget.addSpacer(6);
const label = widget.addText("Weekly");
label.font = Font.systemFont(12);
label.textColor = new Color("#b8b0c8");

const big = widget.addText(`${data.percentLeft}% left`);
big.font = Font.boldSystemFont(22);
big.textColor = Color.white();

widget.addSpacer(8);
// 进度条
const barW = 260, barH = 8;
const ctx = new DrawContext();
ctx.size = new Size(barW, barH);
ctx.opaque = false;
ctx.respectScreenScale = true;
ctx.setFillColor(new Color("#3a334d"));
ctx.fillRoundedRect(new Rect(0, 0, barW, barH), 4);
const fillW = Math.max(barH, barW * Math.min(100, Math.max(0, data.percentLeft)) / 100);
ctx.setFillColor(new Color("#8b7cf0"));
ctx.fillRoundedRect(new Rect(0, 0, fillW, barH), 4);
const bar = widget.addImage(ctx.getImage());
bar.imageSize = new Size(barW, barH);

widget.addSpacer(8);
const days = daysUntil(data.resetsAt);
if (days !== null) {
  const r = widget.addText(`Resets in ${days}日`);
  r.font = Font.systemFont(12);
  r.textColor = new Color("#b8b0c8");
}
const upd = data.updatedAt ? new Date(data.updatedAt) : new Date();
const u = widget.addText(`Updated ${fmtTime(upd)}`);
u.font = Font.systemFont(10);
u.textColor = new Color("#7e7591");

widget.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}
Script.complete();
