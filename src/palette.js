/** @return {Map<number, ImageData>} */
export function loadPalettes() {
  /** @type {Map<number, ImageData>} */
  const palettes = new Map()
  for (let h = 0; h < 360; h++) {
    const data = new Uint8ClampedArray(4 * 100 * 100)
    for (let s = 0; s < 100; s++) {
      for (let v = 0; v < 100; v++) {
        const [r, g, b] = hsvToRgb(h / 360, s / 100, v / 100)
        const i = (s * 100 + v) * 4
        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
        data[i + 3] = 255
      }
    }
    const image = new ImageData(data, 100, 100, { colorSpace: 'srgb' })
    palettes.set(h, image)
  }
  return palettes
}
/**
 * Convert HSV color to RGB
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @returns {[number, number, number]}
 */
function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      return roundAndConvert([v, t, p])
    case 1:
      return roundAndConvert([q, v, p])
    case 2:
      return roundAndConvert([p, v, t])
    case 3:
      return roundAndConvert([p, q, v])
    case 4:
      return roundAndConvert([t, p, v])
    case 5:
      return roundAndConvert([v, p, q])
    default:
      throw new Error('impossible value')
  }
}

/**
 * Convert a float color tuple into a 0-255 color tuple
 * @param {[number, number, number]} param0
 * @returns {[number, number, number]}
 */
function roundAndConvert([r, g, b]) {
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}
