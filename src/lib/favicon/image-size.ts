/** Reads pixel dimensions from common image headers without decoding the image. */
export function imageDimensions(bytes: Uint8Array, type: string): { width: number; height: number } | null {
	const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	try {
		switch (type) {
			case 'image/png':
				if (bytes.length >= 24) return { width: view.getUint32(16), height: view.getUint32(20) };
				return null;
			case 'image/gif':
				if (bytes.length >= 10) return { width: view.getUint16(6, true), height: view.getUint16(8, true) };
				return null;
			case 'image/bmp':
				if (bytes.length >= 26) return { width: Math.abs(view.getInt32(18, true)), height: Math.abs(view.getInt32(22, true)) };
				return null;
			case 'image/x-icon': {
				// Report the largest image in the ICO directory (0 means 256).
				const count = view.getUint16(4, true);
				let best = 0;
				for (let i = 0; i < count && 6 + i * 16 + 2 <= bytes.length; i++) {
					const width = bytes[6 + i * 16] || 256;
					best = Math.max(best, width);
				}
				return best ? { width: best, height: best } : null;
			}
			case 'image/jpeg': {
				let offset = 2;
				while (offset + 9 < bytes.length) {
					if (bytes[offset] !== 0xff) return null;
					const marker = bytes[offset + 1]!;
					const length = view.getUint16(offset + 2);
					if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
						return { width: view.getUint16(offset + 7), height: view.getUint16(offset + 5) };
					}
					offset += 2 + length;
				}
				return null;
			}
			case 'image/webp': {
				const chunk = String.fromCharCode(bytes[12]!, bytes[13]!, bytes[14]!, bytes[15]!);
				if (chunk === 'VP8X' && bytes.length >= 30) {
					const width = 1 + (bytes[24]! | (bytes[25]! << 8) | (bytes[26]! << 16));
					const height = 1 + (bytes[27]! | (bytes[28]! << 8) | (bytes[29]! << 16));
					return { width, height };
				}
				if (chunk === 'VP8 ' && bytes.length >= 30) {
					return { width: view.getUint16(26, true) & 0x3fff, height: view.getUint16(28, true) & 0x3fff };
				}
				if (chunk === 'VP8L' && bytes.length >= 25) {
					const bits = view.getUint32(21, true);
					return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
				}
				return null;
			}
			case 'image/svg+xml': {
				const text = new TextDecoder().decode(bytes.subarray(0, 4096));
				const tag = text.match(/<svg\b[^>]*>/i)?.[0] ?? '';
				const width = parseFloat(tag.match(/\bwidth\s*=\s*["']?([\d.]+)(?:px)?["'\s>]/i)?.[1] ?? '');
				const height = parseFloat(tag.match(/\bheight\s*=\s*["']?([\d.]+)(?:px)?["'\s>]/i)?.[1] ?? '');
				if (width && height) return { width: Math.round(width), height: Math.round(height) };
				const viewBox = tag.match(/viewBox\s*=\s*["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
				if (viewBox) return { width: Math.round(Number(viewBox[1])), height: Math.round(Number(viewBox[2])) };
				return null;
			}
			default:
				return null;
		}
	} catch {
		return null;
	}
}
