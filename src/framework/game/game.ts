import { Global } from "./global";
import { Events } from "../events";
import { DeltaTime } from "../utils";

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
    Global.dt = this.deltaTime.value;

    // Clear the canvas
    Global.ctx.clearRect(0, 0, Global.canvas.width, Global.canvas.height);

    // Fire the step and draw events
    Events.eventsLoop.fireAll();
    Global.input.updatePrevStates();

    // Reques the next frame
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  start() {
    Events.gameEvents.fireGameBegin();
    this.gameLoop();
  }

  stop() {
    Events.gameEvents.fireGameEnd();
  }
}
