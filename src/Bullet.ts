import { Entity, Game, LoopParams } from "./@framework";
import { ShapeDrawer } from "./@framework/helpers/ShapeDrawer";

export class Bullet extends Entity {
  direction = 0;
  speed = 128;

  constructor(props?: Partial<PropsOf<Bullet>>) {
    super(props);
    Object.assign(this, props);
  }

  getLenX(range: number, angle: number) {
    return range * Math.cos(angle);
  }

  getLenY(range: number, angle: number) {
    return range * Math.sin(angle);
  }

  stepLoop({ dt }: LoopParams): void | Promise<void> {
    this.x += this.getLenX(10, this.direction) * this.speed * dt;
    this.y += this.getLenY(10, this.direction) * this.speed * dt;
    if (
      this.x > Game.canvas.width ||
      this.x < 0 ||
      this.y > Game.canvas.height ||
      this.y < 0
    ) {
      this.destroy();
    }
  }

  drawLoop({}: LoopParams): void | Promise<void> {
    ShapeDrawer.circle(this.x, this.y, 5, {
      fill: "red",
    });
  }

  // destroy(): void {
  //   // do nothing
  // }
}
