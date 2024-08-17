export class LoopUtils {
  static repeat(times: number, callback: () => void): void {
    for (let i = 0; i < times; i++) {
      callback();
    }
  }

  static wait(time: number, callback: () => void): NodeJS.Timeout {
    return setTimeout(callback, time);
  }

  static async waitAsync(time: number, callback: () => void): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(callback, time);
      resolve();
    });
  }

  static async repeatAsync(
    times: number,
    callback: () => Promise<void>
  ): Promise<void> {
    for (let i = 0; i < times; i++) {
      await callback();
    }
  }
}
