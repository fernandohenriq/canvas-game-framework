import { Entity, Game, LoopParams } from "./@framework";
import { LoopUtils } from "./@framework/helpers/LoopUtils";
import { Sprite } from "./@framework/Sprite";
import { Bullet } from "./Bullet";

export class Unit extends Entity {
  sprite = new Sprite("src/assets/human.png", {});

  constructor(props?: Partial<PropsOf<Unit>>) {
    super(props);
  }

  stepLoop = async ({}: LoopParams) => {
    const moveX =
      Number(Game.input.isKeyPressing("D")) -
      Number(Game.input.isKeyPressing("A"));
    const moveY =
      Number(Game.input.isKeyPressing("S")) -
      Number(Game.input.isKeyPressing("W"));
    this.x += moveX;
    this.y += moveY;
  };

  drawLoop = async ({}: LoopParams) => {
    this.sprite.draw(this.x, this.y);
    this.sprite.angle = Game.input.getMouseDirection(this.x, this.y);
    if (Game.input.isMouseButtonPressed(0)) {
      LoopUtils.repeat(1000, () => {
        new Bullet({
          x: this.x,
          y: this.y,
          direction: this.sprite.angle + Math.random() * Math.PI * 2,
        });
      });
    }
  };
}
