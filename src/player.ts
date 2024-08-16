import { Entity, Global, ShapeDrawer, Sprite } from "./framework";
import { LoopUtils } from "./framework/utils/test/loopUtils";
import { ParticleSystem } from "./framework/utils/test/particleSystem";
import {
  ParticleSystem2,
  SpriteParticle,
} from "./framework/utils/test/particleSystem2";
import { Vector2 } from "./framework/utils/test/vector2";

const particleSystem = new ParticleSystem();
const particleSystem2 = new ParticleSystem2();

export class Player extends Entity {
  spd: number = 64;
  rotationSpeed: number = 5; // Adjust this value to change rotation speed
  currentAngle: number = 0;

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

  // Helper function to calculate the shortest angle difference
  angleDifference(angle1: number, angle2: number): number {
    let diff = angle2 - angle1;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    return diff;
  }

  stepEvent(): void {
    const { dt, input } = Global;
    // Move using WASD keys
    const xDir =
      Number(input.isKeyPressing("d")) - Number(input.isKeyPressing("a"));
    const yDir =
      Number(input.isKeyPressing("s")) - Number(input.isKeyPressing("w"));
    this.move(xDir, yDir);
    this.x += this.xSpd * dt;
    this.y += this.ySpd * dt;

    // Calculate target angle to mouse cursor
    const { x: mouseX, y: mouseY } = input.getMousePosition();
    const targetAngle = Math.atan2(mouseY - this.y, mouseX - this.x);

    // Calculate the difference between current and target angle
    const angleDiff = this.angleDifference(this.currentAngle, targetAngle);

    // Rotate towards the target angle
    if (Math.abs(angleDiff) > 0.01) {
      // Threshold to prevent jittering
      const rotationAmount = Math.sign(angleDiff) * this.rotationSpeed * dt;
      this.currentAngle +=
        Math.abs(rotationAmount) > Math.abs(angleDiff)
          ? angleDiff
          : rotationAmount;
    }

    // Normalize the angle
    this.currentAngle = (this.currentAngle + 2 * Math.PI) % (2 * Math.PI);

    // Apply the rotation to the sprite
    this.sprite.angle = this.currentAngle;

    // Check for right-click to perform an action
    if (input.isMouseButtonPressed(2)) {
      console.log("Right-click action performed!");
    }

    // Use mouse wheel
    const wheelDelta = input.getMouseWheel();
    if (wheelDelta !== 0) {
      console.log("Mouse wheel scrolled:", wheelDelta);
    }
  }

  drawEvent(): void {
    ShapeDrawer.text(
      `FPS: ${Math.round(1 / Global.dt)}`,
      Global.canvas.width - 128,
      42,
      {
        fill: "#00FF00",
        fontSize: "32px",
      }
    );

    this.sprite.draw(this.x, this.y);

    ShapeDrawer.circle(this.x, this.y, 32, {
      lineWidth: 5,
      stroke: "whited",
      alpha: 0.5,
      fill: "yellow",
      lineDash: [10, 10],
      shadow: {
        color: "blue",
        blur: 5,
        offsetX: 5,
        offsetY: 5,
      },
    });

    ShapeDrawer.text("Hello World", 128, 128, {
      fill: Math.random() > 0.5 ? "red" : "blue",
    });

    // Emit new particles as needed
    if (Global.input.isMouseButtonPressing(0)) {
      LoopUtils.repeat(10, () => {
        particleSystem.emit(this.x, this.y, {
          color: "red",
          size: 5,
          speed: 100,
          lifetime: 4,
          direction: new Vector2(
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize(),
        });
      });
    }

    particleSystem2.emitSprite(
      new SpriteParticle({
        lifetime: 5,
        position: new Vector2(this.x, this.y),
        size: 10,
        velocity: new Vector2(16, 16),
        acceleration: new Vector2(4, 4),
        sprite: {
          image: this.sprite.image,
          fps: 10,
          frameHeight: 32,
          frameWidth: 32,
          totalFrames: 8,
        },
      })
    );

    // Update particles
    particleSystem.update(Global.dt);
    particleSystem2.update(Global.dt);

    // Render particles
    particleSystem.render(Global.ctx);
    particleSystem2.render(Global.ctx);
  }
}
