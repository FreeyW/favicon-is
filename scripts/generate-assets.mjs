#!/usr/bin/env node
/**
 * Generates derived image assets in public/ from public/favicon.png:
 *   favicon.ico (16/32/48, PNG-compressed), apple-touch-icon.png (180),
 *   icon-192.png (192) and og-image.png (1200×630).
 * Requires Playwright with Chromium:  node scripts/generate-assets.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const pub = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
const source = `data:image/png;base64,${readFileSync(pub('favicon.png')).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage();

async function resize(size, { background = 'transparent', padding = 0 } = {}) {
	await page.setViewportSize({ width: size, height: size });
	await page.setContent(
		`<html><body style="margin:0;background:${background}"><img src="${source}" style="display:block;width:${size - padding * 2}px;height:${size - padding * 2}px;margin:${padding}px"></body></html>`,
	);
	await page.waitForLoadState('load');
	return page.screenshot({ omitBackground: background === 'transparent', type: 'png' });
}

// PNG-compressed ICO container (supported by every current browser and Windows Vista+).
function ico(images) {
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(images.length, 4);
	const entries = [];
	let offset = 6 + images.length * 16;
	for (const { size, data } of images) {
		const entry = Buffer.alloc(16);
		entry.writeUInt8(size >= 256 ? 0 : size, 0);
		entry.writeUInt8(size >= 256 ? 0 : size, 1);
		entry.writeUInt8(0, 2);
		entry.writeUInt8(0, 3);
		entry.writeUInt16LE(1, 4);
		entry.writeUInt16LE(32, 6);
		entry.writeUInt32LE(data.length, 8);
		entry.writeUInt32LE(offset, 12);
		offset += data.length;
		entries.push(entry);
	}
	return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

const icoImages = [];
for (const size of [16, 32, 48]) icoImages.push({ size, data: await resize(size) });
writeFileSync(pub('favicon.ico'), ico(icoImages));
// iOS fills transparency with black, so give the touch icon a solid background.
writeFileSync(pub('apple-touch-icon.png'), await resize(180, { background: '#ffffff', padding: 10 }));
writeFileSync(pub('icon-192.png'), await resize(192));

const tiles = ['G', 'Y', 'GH', 'W', 'A', 'N', 'R', 'X', 'IN', 'S', 'F', 'D'];
const colors = ['#4285F4', '#FF0000', '#181717', '#636466', '#FF9900', '#E50914', '#FF4500', '#000000', '#0A66C2', '#1DB954', '#A259FF', '#5865F2'];
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head><style>
	body{margin:0;width:1200px;height:630px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#020617;color:#fff;overflow:hidden;position:relative}
	.grid{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(148,163,184,.12) 1px,transparent 1px),linear-gradient(to bottom,rgba(148,163,184,.12) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse at 30% 40%,#000 30%,transparent 75%)}
	.glow{position:absolute;width:900px;height:600px;left:-200px;top:-300px;border-radius:50%;background:radial-gradient(closest-side,rgba(43,181,255,.45),transparent);filter:blur(20px)}
	.glow2{position:absolute;width:700px;height:500px;right:-200px;bottom:-250px;border-radius:50%;background:radial-gradient(closest-side,rgba(139,92,246,.4),transparent);filter:blur(20px)}
	.content{position:absolute;left:80px;top:96px;width:620px}
	.brand{display:flex;align-items:center;gap:18px;font-size:40px;font-weight:800;letter-spacing:-.02em}
	.brand img{width:64px;height:64px;border-radius:14px}
	.brand span{color:#38bdf8}
	h1{font-size:64px;line-height:1.05;margin:44px 0 0;font-weight:800;letter-spacing:-.03em}
	h1 em{font-style:normal;background:linear-gradient(90deg,#38bdf8,#818cf8,#c084fc);-webkit-background-clip:text;color:transparent}
	.url{margin-top:40px;display:inline-block;padding:16px 22px;border-radius:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);font:500 26px ui-monospace,SFMono-Regular,Menlo,monospace;color:#cbd5e1}
	.url b{color:#38bdf8;font-weight:600}
	.tiles{position:absolute;right:70px;top:70px;display:grid;grid-template-columns:repeat(3,112px);gap:22px;transform:rotate(-8deg)}
	.tile{width:112px;height:112px;border-radius:26px;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 40px rgba(0,0,0,.35)}
	.tile i{width:60px;height:60px;border-radius:16px;display:flex;align-items:center;justify-content:center;font:800 26px Inter,system-ui,sans-serif;font-style:normal;color:#fff}
</style></head><body>
	<div class="grid"></div><div class="glow"></div><div class="glow2"></div>
	<div class="content">
		<div class="brand"><img src="${source}"><div>Favicon<span>.is</span></div></div>
		<h1>Get any website’s favicon <em>with one URL</em></h1>
		<div class="url">https://favicon.is/<b>example.com</b></div>
	</div>
	<div class="tiles">${tiles.map((label, i) => `<div class="tile"><i style="background:${colors[i]}">${label}</i></div>`).join('')}</div>
</body></html>`);
await page.waitForLoadState('load');
writeFileSync(pub('og-image.png'), await page.screenshot({ type: 'png' }));

await browser.close();
console.log('Generated favicon.ico, apple-touch-icon.png, icon-192.png and og-image.png');
