export class Vector2 {
  constructor(public x: number, public y: number) {}

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  multiply(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number): Vector2 {
    if (scalar === 0) throw new Error("Division by zero");
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2 {
    const mag = this.magnitude();
    if (mag === 0) return new Vector2(0, 0);
    return this.divide(mag);
  }

  dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }

  distanceTo(other: Vector2): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}
