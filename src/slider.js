import { Bounds } from './bounds.js'
import { Input } from './input.js'
import { createCanvas } from './lib.js'

export class Slider extends Bounds {
  /** @type {OffscreenCanvasRenderingContext2D} */
  #image
  /** @type {number} */
  #value = 0
  /**
   * @param {number} w
   * @param {number} h
   */
  constructor(w, h) {
    super(w, h)
    this.#image = createCanvas(w, h)
    this.#render()
  }
  /** @returns {number} */
  value() {
    return this.#value
  }
  /**
   * Update the slider
   * @param {Input} input The input state
   * @returns {boolean} True if the state of the slider has changed
   */
  update(input) {
    const prev = this.#value
    const [x, y] = input.pos()
    if (input.mouseLeft && this.isWithin(x, y)) {
      if (x <= 3) {
        this.#value = 0
      } else if (x >= this.dx() - 3) {
        this.#value = 1
      } else {
        this.#value = (x - 3) / (this.dx() - 6)
      }
    }
    if (prev !== this.#value) {
      this.#render()
      return true
    }
    return false
  }
  /**
   * @returns {OffscreenCanvas}
   */
  image() {
    return this.#image.canvas
  }

  #render() {
    this.#image.reset()
    this.#image.fillStyle = '#000000'
    this.#image.fillRect(3, this.dy() / 2 - 2, this.dx() - 6, 4)
    this.#image.fillStyle = '#a0a0a0'
    this.#image.fillRect(this.#value * this.dx() - 4, 0, 8, this.dy())
  }
}
