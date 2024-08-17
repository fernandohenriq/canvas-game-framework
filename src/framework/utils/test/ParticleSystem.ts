import { Vector2 } from "./Vector2";

export interface ParticleOptions {
  color: string;
  size: number;
  speed: number;
  lifetime: number;
  direction: Vector2;
}

export class Particle {
  position: Vector2;
  velocity: Vector2;
  color: string;
  size: number;
  lifetime: number;
  age: number = 0;

  constructor(x: number, y: number, options: ParticleOptions) {
    this.position = new Vector2(x, y);
    this.velocity = options.direction.multiply(options.speed);
    this.color = options.color;
    this.size = options.size;
    this.lifetime = options.lifetime;
  }

  update(deltaTime: number): void {
    this.position = this.position.add(this.velocity.multiply(deltaTime));
    this.age += deltaTime;
  }

  isAlive(): boolean {
    return this.age < this.lifetime;
  }
}

export class ParticleSystem {
  private particles: Particle[] = [];

  constructor() {}

  emit(x: number, y: number, options: ParticleOptions): void {
    const particle = new Particle(x, y, options);
    this.particles.push(particle);
  }

  update(deltaTime: number): void {
    this.particles = this.particles.filter((particle) => {
      particle.update(deltaTime);
      return particle.isAlive();
    });
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    for (const particle of this.particles) {
      const alpha = 1 - particle.age / particle.lifetime;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(
        particle.position.x,
        particle.position.y,
        particle.size,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.restore();
  }
}
