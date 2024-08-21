export class EventManager {
  events: { [key: string]: ((...args: any[]) => void)[] } = {};
  on(eventName: string, callback: (...args: any[]) => void) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  off(eventName: string, callback: (...args: any[]) => void) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }

  emit(eventName: string, ...args: any[]) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach((callback) => {
      callback(...args);
    });
  }
}
