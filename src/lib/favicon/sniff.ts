/** Detects an image type from its first bytes. Returns `null` for anything that isn't an image. */
export function sniffImageType(bytes: Uint8Array, declared = ''): string | null {
	if (bytes.length < 4) return null;
	const b = bytes;
	if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
	if (b[0] === 0x00 && b[1] === 0x00 && (b[2] === 0x01 || b[2] === 0x02) && b[3] === 0x00) return 'image/x-icon';
	if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
	if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38) return 'image/gif';
	if (b[0] === 0x42 && b[1] === 0x4d) return 'image/bmp';
	if (
		b.length >= 12 &&
		b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
		b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
	) {
		return 'image/webp';
	}
	if (b.length >= 12 && b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70) {
		const brand = String.fromCharCode(b[8]!, b[9]!, b[10]!, b[11]!);
		if (brand === 'avif' || brand === 'avis') return 'image/avif';
	}
	// SVG: text that contains an <svg> root element.
	const head = new TextDecoder().decode(b.subarray(0, Math.min(b.length, 2048))).trimStart().toLowerCase();
	if (head.startsWith('<svg') || ((head.startsWith('<?xml') || head.startsWith('<!--') || head.startsWith('<!doctype svg')) && head.includes('<svg'))) {
		return 'image/svg+xml';
	}
	if (declared.includes('svg') && head.includes('<svg')) return 'image/svg+xml';
	return null;
}

export function extensionFor(contentType: string): string {
	switch (contentType) {
		case 'image/png':
			return 'png';
		case 'image/x-icon':
			return 'ico';
		case 'image/jpeg':
			return 'jpg';
		case 'image/gif':
			return 'gif';
		case 'image/webp':
			return 'webp';
		case 'image/avif':
			return 'avif';
		case 'image/bmp':
			return 'bmp';
		case 'image/svg+xml':
			return 'svg';
		default:
			return 'img';
	}
}
