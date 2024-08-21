import { Game } from "./globals/Game";

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

  constructor(
    spriteOrProps?: string | Partial<PropsOf<Sprite>>,
    props: Partial<PropsOf<Sprite>> = {}
  ) {
    props =
      typeof spriteOrProps === "string"
        ? { src: spriteOrProps, ...props }
        : { ...spriteOrProps, ...props };
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

    Game.ctx.save();
    Game.ctx.translate(x, y);
    Game.ctx.rotate(this.angle);
    Game.ctx.globalCompositeOperation = "multiply";
    Game.ctx.globalAlpha = this.alpha;
    Game.ctx.fillStyle = this.blendColor;
    Game.ctx.drawImage(
      this.image,
      -this.width / 2 + this.xOffset,
      -this.height / 2 + this.yOffset,
      this.width,
      this.height
    );
    Game.ctx.restore();
  }
}
