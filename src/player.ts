import { Entity, Global, Sprite } from "./framework";

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

  stepEvent({ dt, input }: Global): void {
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

  drawEvent({}: Global): void {
    this.sprite.draw(this.x, this.y);
  }
}
