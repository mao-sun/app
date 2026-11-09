// Muse Usage Widget v10 for Scriptable (iOS)
// 蓝色主题 + 大头特写横幅（BASE64 内嵌）+ 圆角胶囊进度条
// 数据源：GitHub 上的 usage.json，由 Muse 每 3 小时自动更新

const DATA_URL = "https://raw.githubusercontent.com/mao-sun/app/main/muse-usage/usage.json";
const AVATAR_BASE64 = "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";
const FALLBACK = { percentLeft: 91, resetsAt: "2026-11-16T04:36:00+08:00", updatedAt: null };

async function loadData() {
  try {
    const req = new Request(DATA_URL + "?t=" + Date.now());
    req.timeoutInterval = 10;
    const json = await req.loadJSON();
    if (typeof json.percentLeft === "number") return json;
  } catch (e) {}
  return FALLBACK;
}

function fmtDate(d) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = d.getDate();
  const rem100 = day % 100, rem10 = day % 10;
  let suffix = "th";
  if (rem100 < 11 || rem100 > 13) {
    if (rem10 === 1) suffix = "st";
    else if (rem10 === 2) suffix = "nd";
    else if (rem10 === 3) suffix = "rd";
  }
  const p = n => String(n).padStart(2, "0");
  return `${months[d.getMonth()]} ${day}${suffix} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function barWidth() {
  const f = config.widgetFamily;
  if (f === "medium" || f === "large") return 296;
  return 138;
}

function progressBar(pct) {
  const W = barWidth(), H = 14, R = H / 2;
  const ctx = new DrawContext();
  ctx.size = new Size(W, H);
  ctx.opaque = false;
  ctx.respectScreenScale = true;
  const track = new Path();
  track.addRoundedRect(new Rect(0, 0, W, H), R, R);
  ctx.addPath(track);
  ctx.setFillColor(new Color("#ffffff", 0.28));
  ctx.fillPath();
  const clamped = Math.min(100, Math.max(0, pct));
  const fillW = Math.max(H, Math.round(W * clamped / 100));
  const fill = new Path();
  fill.addRoundedRect(new Rect(0, 0, fillW, H), R, R);
  ctx.addPath(fill);
  ctx.setFillColor(new Color("#4cc3ff"));
  ctx.fillPath();
  if (fillW > W * 0.3) {
    const segX = Math.round(fillW * 0.55);
    const seg = new Path();
    seg.addRoundedRect(new Rect(segX, 0, fillW - segX, H), R, R);
    ctx.addPath(seg);
    ctx.setFillColor(new Color("#1f8ae0", 0.65));
    ctx.fillPath();
  }
  [0.25, 0.5, 0.75].forEach(t => {
    const x = Math.round(W * t);
    if (x > fillW + 4) {
      ctx.setFillColor(new Color("#ffffff", 0.45));
      ctx.fillEllipse(new Rect(x - 2, H / 2 - 2, 4, 4));
    }
  });
  if (clamped > 8 && clamped < 97) {
    ctx.setFillColor(new Color("#ffffff", 0.98));
    ctx.fillEllipse(new Rect(fillW - 12, 2, 10, 10));
    ctx.setFillColor(new Color("#0b63c4"));
    ctx.fillEllipse(new Rect(fillW - 9.5, 4.5, 5, 5));
  }
  return ctx.getImage();
}

const data = await loadData();
const widget = new ListWidget();
const grad = new LinearGradient();
grad.colors = [new Color("#0a2f6e"), new Color("#0b63c4"), new Color("#0a8fd6")];
grad.locations = [0, 0.55, 1];
widget.backgroundGradient = grad;
widget.setPadding(12, 12, 12, 12);

try {
  const imgData = Data.fromBase64String(AVATAR_BASE64);
  const banner = imgData ? Image.fromData(imgData) : null;
  if (banner) {
    const tile = widget.addStack();
    tile.backgroundColor = Color.white();
    tile.cornerRadius = 16;
    tile.setPadding(3, 3, 3, 3);
    const im = tile.addImage(banner);
    const f = config.widgetFamily;
    im.imageSize = (f === "medium" || f === "large") ? new Size(290, 128) : new Size(140, 62);
    im.cornerRadius = 13;
  }
} catch (e) {}

widget.addSpacer(10);
const row = widget.addStack();
row.layoutHorizontally();
row.bottomAlignContent();

const left = row.addStack();
left.layoutVertically();
const title = left.addText("Muse");
title.font = Font.boldSystemFont(14);
title.textColor = new Color("#bfe3ff");
left.addSpacer(2);
const label = left.addText("本周剩余");
label.font = Font.systemFont(11);
label.textColor = new Color("#d7efff");

row.addSpacer();

const big = row.addText(`${data.percentLeft}%`);
big.font = Font.boldSystemFont(30);
big.textColor = Color.white();
big.minimumScaleFactor = 0.7;

widget.addSpacer(12);
const bar = widget.addImage(progressBar(data.percentLeft));
bar.imageSize = new Size(barWidth(), 14);

widget.addSpacer(8);
const upd = data.updatedAt ? new Date(data.updatedAt) : new Date();
const u = widget.addText(fmtDate(upd));
u.font = Font.systemFont(10);
u.textColor = new Color("#a8d4f5");
widget.addSpacer();

widget.url = "https://muse.ai/chat";
widget.refreshAfterDate = new Date(Date.now() + 15 * 60 * 1000);

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}
Script.complete();
