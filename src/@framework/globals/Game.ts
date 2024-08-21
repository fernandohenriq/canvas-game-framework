import { Entity } from "../Entity";
import { EventManager } from "../helpers/EventManager";
import { ShapeDrawer } from "../helpers/ShapeDrawer";
import { Input } from "../Input";
import { Room } from "../Room";

export class Game {
  static canvas = document.body.appendChild(document.createElement("canvas"));
  static ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;
  static events: EventManager = new EventManager();
  static currentRoom: Room;
  static input: Input = new Input();
  static showFps: boolean = true;

  private static mainLoop() {
    this.currentRoom.loop();
    if (this.showFps) {
      const fps = this.currentRoom.getFps().toFixed(1);
      ShapeDrawer.text(`${fps}`, 8, 24, {
        fill: "green",
        fontSize: "24px",
      });
    }
    requestAnimationFrame(Game.mainLoop.bind(this));
  }

  private static registerEvents() {
    this.events.on("entityCreated", (entity: Entity) => {
      this.currentRoom.addEntity("main", entity);
    });
    this.events.on("entityDestroyed", (entity: Entity) => {
      this.currentRoom.removeEntity(entity);
    });
  }

  static start() {
    try {
      // load fist room
      const room = this.currentRoom ?? new Room();
      this.currentRoom = room;

      this.registerEvents();
      // calls main loop
      this.mainLoop();
    } catch (err: unknown) {
      // error handler
      const error = err as Error;
      const errorString = `\n### ERROR ###\n\n${
        error?.stack || error?.message || error
      }\n`;
      console.error(errorString);
      alert(errorString);
    }
    return this;
  }
}
