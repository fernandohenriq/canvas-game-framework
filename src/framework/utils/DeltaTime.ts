export class DeltaTime {
  private dt: number;
  private lastTime: number;

  get value() {
    return this.dt;
  }

  constructor() {
    this.lastTime = performance.now();
    this.dt = this.calcDeltaTime();
  }

  private calcDeltaTime() {
    // Get the delta time
    const currentTime = performance.now();
    const dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    return dt;
  }

  mainLoop() {
    this.dt = this.calcDeltaTime();
  }
}
