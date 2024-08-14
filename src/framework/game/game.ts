import { global } from "..";
import { Events } from "../events/events";
import { DeltaTime } from "../utils/deltaTime";

export class Game {
  private deltaTime = new DeltaTime();

  constructor() {
    // Stop the game when the user closes the tab
    window.addEventListener("beforeunload", () => {
      // event.preventDefault();
      this.stop();
      return true;
    });
  }

  private gameLoop() {
    // Get the delta time
    this.deltaTime.mainLoop();
    global.dt = this.deltaTime.value;

    // Clear the canvas
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    // Fire the step and draw events
    Events.eventsLoop.fireAll(global);
    global.input.updatePrevStates();

    // Reques the next frame
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  start() {
    Events.gameEvents.fireGameBegin(global);
    this.gameLoop();
  }

  stop() {
    Events.gameEvents.fireGameEnd(global);
  }
}
