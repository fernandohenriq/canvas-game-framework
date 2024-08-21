import { Game } from "../globals/Game";
import { Vector2 } from "./Vector2";

export abstract class BaseParticle {
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  size: number;
  lifetime: number;
  age: number = 0;

  constructor(options: ParticleOptions) {
    this.position = options.position.clone();
    this.velocity = options.velocity.clone();
    this.acceleration = options.acceleration?.clone() || new Vector2(0, 0);
    this.size = options.size;
    this.lifetime = options.lifetime;
  }

  update(deltaTime: number): void {
    this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));
    this.position = this.position.add(this.velocity.multiply(deltaTime));
    this.age += deltaTime;
  }

  isAlive(): boolean {
    return this.age < this.lifetime;
  }

  abstract render(ctx: CanvasRenderingContext2D): void;
}

export class SimpleParticle extends BaseParticle {
  color: string;

  constructor(options: SimpleParticleOptions) {
    super(options);
    this.color = options.color;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class ImageParticle extends BaseParticle {
  image: HTMLImageElement;

  constructor(options: ImageParticleOptions) {
    super(options);
    this.image = options.image;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

export class SpriteParticle extends BaseParticle {
  sprite: {
    image: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    totalFrames: number;
    fps: number;
  };
  private currentFrame: number = 0;
  private frameTime: number;

  constructor(options: SpriteParticleOptions) {
    super(options);
    this.sprite = options.sprite;
    this.frameTime = 1 / this.sprite.fps;
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    this.currentFrame += deltaTime / this.frameTime;
    if (this.currentFrame >= this.sprite.totalFrames) {
      this.currentFrame = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const frameIndex = Math.floor(this.currentFrame);
    const frameX =
      (frameIndex % this.sprite.totalFrames) * this.sprite.frameWidth;
    const frameY = 0;
    ctx.drawImage(
      this.sprite.image,
      frameX,
      frameY,
      this.sprite.frameWidth,
      this.sprite.frameHeight,
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    );
  }
}

export class CustomParticle extends BaseParticle {
  renderFunction: (options: {
    ctx?: CanvasRenderingContext2D;
    particle: CustomParticle;
  }) => void;

  constructor(options: CustomParticleOptions) {
    super(options);
    this.renderFunction = options.renderFunction;
  }

  render(ctx: CanvasRenderingContext2D = Game.ctx): void {
    this.renderFunction({
      ctx,
      particle: this,
    });
  }
}

interface ParticleOptions {
  position: Vector2;
  velocity: Vector2;
  acceleration?: Vector2;
  size: number;
  lifetime: number;
}

interface SimpleParticleOptions extends ParticleOptions {
  color: string;
}

interface ImageParticleOptions extends ParticleOptions {
  image: HTMLImageElement;
}

interface SpriteParticleOptions extends ParticleOptions {
  sprite: {
    image: HTMLImageElement;
    frameWidth: number;
    frameHeight: number;
    totalFrames: number;
    fps: number;
  };
}

interface CustomParticleOptions extends ParticleOptions {
  renderFunction: (options: {
    particle: CustomParticle;
    ctx?: CanvasRenderingContext2D;
  }) => void;
}

export class ParticleSystem {
  private particles: BaseParticle[] = [];

  emitSimple(options: SimpleParticleOptions): void {
    this.particles.push(new SimpleParticle(options));
  }

  emitImage(options: ImageParticleOptions): void {
    this.particles.push(new ImageParticle(options));
  }

  emitSprite(options: SpriteParticleOptions): void {
    this.particles.push(new SpriteParticle(options));
  }

  emitCustom(options: CustomParticleOptions): void {
    this.particles.push(new CustomParticle(options));
  }

  update(deltaTime: number): void {
    this.particles = this.particles.filter((particle) => {
      particle.update(deltaTime);
      return particle.isAlive();
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (const particle of this.particles) {
      ctx.save();
      const alpha = 1 - particle.age / particle.lifetime;
      ctx.globalAlpha = alpha;
      particle.render(ctx);
      ctx.restore();
    }
  }
}
