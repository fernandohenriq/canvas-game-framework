import { Global } from "src/framework/game";

export type TimerOptions = {
  loops?: number;
};

export class Timer {
  private duration: number;
  private elapsed: number = 0;
  private paused: boolean = false;
  private loops: number = 1; // -1 = infinite, 0 = no loops, 1 = 1 loop, 2 = 2 loops, etc.

  constructor(duration: number, options: TimerOptions = {}) {
    this.duration = duration;
    this.loops = options?.loops ?? 1;
  }

  update(deltaTime: number = Global.dt) {
    if (this.paused) return this;
    if (this.isFinished()) {
      if (this.loops > 0) {
        this.elapsed -= this.duration;
        this.loops--;
      } else {
        return this;
      }
    }
    this.elapsed += deltaTime;
    return this;
  }

  pause() {
    this.paused = true;
    return this;
  }

  resume() {
    this.paused = false;
    return this;
  }

  reset() {
    this.elapsed = 0;
    return this;
  }

  restart() {
    this.paused = false;
    this.reset();
    return this;
  }

  isFinished(): boolean {
    return this.elapsed >= this.duration;
  }

  isRunning(): boolean {
    return !this.paused && !this.isFinished();
  }

  isPaused(): boolean {
    return this.paused;
  }

  getDuration(): number {
    return this.duration;
  }

  getTimeLeft(): number {
    return this.duration - this.elapsed;
  }

  getTimeElapsed(): number {
    return this.elapsed;
  }

  getProgress(): number {
    return this.elapsed / this.duration;
  }
}
