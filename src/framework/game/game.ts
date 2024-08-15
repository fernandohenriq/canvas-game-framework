import { Global } from "./global";
import { Events } from "../events";
import { DeltaTime } from "../utils";

export class Game {
  private static deltaTime = new DeltaTime();

  private constructor() {}

  private static gameLoop() {
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

  static start() {
    Events.gameEvents.fireGameBegin();
    this.gameLoop();
    window.addEventListener("beforeunload", this.stop);
  }

  static stop() {
    Events.gameEvents.fireGameEnd();
  }
}
