import { Entity, Global, Sprite } from "./framework";

export class Player extends Entity {
  spd: number = 64;

  constructor() {
    super();
    this.sprite = new Sprite({
      src: "src/assets/human.png",
    });
  }

  move(xDir: number, yDir: number) {
    xDir = Math.max(-1, Math.min(1, xDir));
    yDir = Math.max(-1, Math.min(1, yDir));
    this.xSpd = xDir * this.spd;
    this.ySpd = yDir * this.spd;
  }

  stepEvent({ dt, input }: Global): void {
    const xDir =
      Number(input.isKeyPressing("d")) - Number(input.isKeyPressing("a"));
    const yDir =
      Number(input.isKeyPressing("s")) - Number(input.isKeyPressing("w"));
    this.move(xDir, yDir);
    this.x += this.xSpd * dt;
    this.y += this.ySpd * dt;
  }

  drawEvent({}: Global): void {
    this.sprite.draw(this.x, this.y);
  }
}
