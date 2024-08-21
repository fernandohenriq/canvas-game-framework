export class DeltaTime {
  private dt: number = 0;
  private lastTime: number = performance.now();

  get value() {
    return this.dt;
  }

  constructor(props?: PropsOf<Partial<DeltaTime>>) {
    Object.assign(this, props);
  }

  update() {
    const currentTime = performance.now();
    this.dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
  }
}
