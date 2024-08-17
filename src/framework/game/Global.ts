import { Input } from "../models";

export class Global {
  static canvas: HTMLCanvasElement;
  static ctx: CanvasRenderingContext2D;
  static input: Input;
  static dt: number;
}

Global.canvas = document.body.appendChild(document.createElement("canvas"));
Global.ctx = Global.canvas.getContext("2d")!;
Global.input = new Input();
Global.dt = 0;

Global.canvas.width = window.innerWidth;
Global.canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  Global.canvas.width = window.innerWidth;
  Global.canvas.height = window.innerHeight;
});
