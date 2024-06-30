import { Input } from './input.js'
import { loadPalettes } from './palette.js'
import { Slider } from './slider.js'

export class Scene {
  /** @type {HTMLCanvasElement} */
  #canvas
  /** @type {CanvasRenderingContext2D} */
  #ctx
  /** @type {Map<number, ImageData>} */
  #palettes
  /** @type {number} */
  #hue = 0
  /** @type {ImageData} */
  #active
  /** @type {Input} */
  #input
  /** @type {Slider} */
  #hueSlider = new Slider(100, 10)
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.#canvas = canvas
    const ctx = this.#canvas.getContext('2d')
    if (!ctx) throw new Error('Unable to get 2d context')
    this.#ctx = ctx
    this.#input = new Input(this.#canvas)
    this.#palettes = loadPalettes()
    this.#hueSlider.xy(0, 100)
    const p = this.#palettes.get(this.#hue)
    if (p) this.#active = p
  }

  update() {
    if (this.#hueSlider.update(this.#input)) {
      this.#hue = Math.floor(this.#hueSlider.value() * 360)
      console.log('hue', this.#hue)
      const p = this.#palettes.get(this.#hue)
      if (p) this.#active = p
    }
  }

  draw() {
    this.#ctx.reset()
    this.#ctx.putImageData(this.#active, 0, 0)
    this.#ctx.drawImage(this.#hueSlider.image(), ...this.#hueSlider.xy())
  }
}
