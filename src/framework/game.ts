import { global } from ".";

export class Game {
  private lastTime = performance.now();

  constructor() {}

  private gameLoop() {
    // Get the delta time
    const currentTime = performance.now();
    const dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    global.dt = dt;

    // Clear the canvas
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    // Fire the step and draw events
    global.events.step.fire("stepEvent", global);
    global.events.draw.fire("drawEvent", global);

    // Reques the next frame
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  start() {
    this.gameLoop();
    global.events.game.fire("gameStart", null);
  }
}
