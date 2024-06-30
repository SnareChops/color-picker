import { Scene } from './scene.js'

function main() {
  const canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 200
  const scene = new Scene(canvas)
  document.querySelector('body')?.append(canvas)

  window.requestAnimationFrame(tick.bind(scene))
}

/** @this {Scene} */
function tick() {
  this.update()
  this.draw()
  window.requestAnimationFrame(tick.bind(this))
}

main()
