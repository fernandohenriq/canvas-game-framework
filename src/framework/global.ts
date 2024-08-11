import { Input, EventManager } from "./utils";

export class Global {
  canvas = document.body.appendChild(document.createElement("canvas"));
  ctx = this.canvas.getContext("2d")!;
  dt = 0;
  input = new Input();
  events = {
    game: new EventManager(),
    step: new EventManager(),
    draw: new EventManager(),
  };
}

export const global = new Global();
