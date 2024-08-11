import { global } from ".";

export class Sprite {
  image: HTMLImageElement;
  src: string;
  width: number;
  height: number;
  blendColor: string;
  angle: number;
  alpha: number;
  xOffset: number;
  yOffset: number;

  private isLoaded = false;

  constructor(props?: Partial<PropsOf<Sprite>>) {
    this.src = props?.src ?? "";
    this.image = props?.image ?? new Image(32, 32);
    this.width = props?.width ?? 32;
    this.height = props?.height ?? 32;
    this.blendColor = props?.blendColor ?? "#ffffff";
    this.angle = props?.angle ?? 0;
    this.alpha = props?.alpha ?? 1;
    this.xOffset = props?.xOffset ?? 0;
    this.yOffset = props?.yOffset ?? 0;
    this.image.src = this.src;

    // Load the image
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
      this.isLoaded = true;
    };

    // Handle image errors
    this.image.onerror = () => {
      console.error(`Failed to load image: ${this.src}`);
    };
  }

  draw(x: number, y: number) {
    if (!this.isLoaded) return;

    global.ctx.save();
    global.ctx.translate(x, y);
    global.ctx.rotate(this.angle);
    global.ctx.globalCompositeOperation = "multiply";
    global.ctx.globalAlpha = this.alpha;
    global.ctx.fillStyle = this.blendColor;
    global.ctx.drawImage(
      this.image,
      -this.width / 2 + this.xOffset,
      -this.height / 2 + this.yOffset,
      this.width,
      this.height
    );
    global.ctx.restore();
  }
}
