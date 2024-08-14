import { Input } from "../models";

export class Global {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  input: Input;
  dt: number;

  constructor() {
    this.canvas = document.body.appendChild(document.createElement("canvas"));
    this.ctx = this.canvas.getContext("2d")!;
    this.input = new Input(this);
    this.dt = 0;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }
}

export const global = new Global();
