export class MathUtils {
  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  static lerp(start: number, end: number, amount: number): number {
    return (1 - amount) * start + amount * end;
  }

  static randomRange(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  static degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static radToDeg(radians: number): number {
    return radians * (180 / Math.PI);
  }
}
