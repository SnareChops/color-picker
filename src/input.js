import { isSet } from './lib.js'

export class Input {
  mouseLeft = false
  mouseRight = false
  mouseMiddle = false
  mouse4 = false
  mouse5 = false
  /** @type {HTMLCanvasElement} */
  #canvas
  /** @type {number} */
  #x = 0
  /** @type {number} */
  #y = 0
  constructor(canvas) {
    this.#canvas = canvas
    this.#canvas.addEventListener('mousemove', this.#mousemove.bind(this))
    this.#canvas.addEventListener('mousedown', this.#mousedown.bind(this))
    this.#canvas.addEventListener('mouseup', this.#mousedown.bind(this))
  }

  /** @returns {[x: number, y: number]} */
  pos() {
    return [this.#x, this.#y]
  }

  /** @param {MouseEvent} event */
  #mousemove(event) {
    const rect = this.#canvas.getBoundingClientRect()
    this.#x = event.clientX - rect.left
    this.#y = event.clientY - rect.top
  }

  /** @param {MouseEvent} event */
  #mousedown(event) {
    this.mouseLeft = isSet(event.buttons, 1 << 0)
    this.mouseRight = isSet(event.buttons, 1 << 1)
    this.mouseMiddle = isSet(event.buttons, 1 << 2)
    this.mouse4 = isSet(event.buttons, 1 << 3)
    this.mouse5 = isSet(event.buttons, 1 << 4)
  }
}
