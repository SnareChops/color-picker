export class Bounds {
  /** @type {number} */
  #x
  /** @type {number} */
  #y
  /** @type {number} */
  #w
  /** @type {number} */
  #h

  constructor(width, height) {
    this.#w = width
    this.#h = height
  }

  /**
   * set/get the x coordinate
   * @param {number} [x]
   * @return {number}
   */
  x(x) {
    if (typeof x !== 'undefined') {
      this.#x = x
    }
    return this.#x
  }
  /**
   * set/get the y coordinate
   * @param {number} [y]
   * @returns {number}
   */
  y(y) {
    if (typeof y !== 'undefined') {
      this.#y = y
    }
    return this.#y
  }
  /**
   * set/get the x,y coordinate
   * @param {number} [x]
   * @param {number} [y]
   * @returns {[x: number, y: number]}
   */
  xy(x, y) {
    return [this.x(x), this.y(y)]
  }
  /**
   * Get the width
   * @returns {number}
   */
  dx() {
    return this.#w
  }
  /**
   * Get the height
   */
  dy() {
    return this.#h
  }
  /**
   * Get the size of the bounds
   * @return {[w: number, h: number]}
   */
  size() {
    return [this.#w, this.#h]
  }
  max() {
    return [this.#x + (this.#w - 1), this.#y + (this.#h - 1)]
  }
  /**
   * Checks if the provided x,y is within the bounds
   * @param {number} x
   * @param {number} y
   */
  isWithin(x, y) {
    if (this.#w === 1 && this.#h === 1) {
      return x === this.#x && y === this.#y
    }
    const [mx, my] = this.max()
    return x >= this.#x && x <= mx && y >= this.#y && y <= my
  }
}
