import { Bounds } from './bounds.js'

/**
 * @param {number} w
 * @param {number} h
 * @return {OffscreenCanvasRenderingContext2D}
 */
export function createCanvas(w, h) {
  const c = new OffscreenCanvas(w, h).getContext('2d')
  if (!c) throw new Error('Failed to create OffscreenCanvas')
  return c
}

/**
 * Checks if a bit is set within a bitmask
 * @param {number} mask
 * @param {number} state
 * @returns {boolean}
 */
export function isSet(mask, state) {
  return (mask & state) === state
}

/**
 * Converts absolute position to relative within the bounds
 * @param {number} x
 * @param {number} y
 * @param {Bounds} bounds
 * @returns {[x: number, y: number]}
 */
export function relativePosition(x, y, bounds) {
  const [bx, by] = bounds.xy()
  return [x - bx, y - by]
}
