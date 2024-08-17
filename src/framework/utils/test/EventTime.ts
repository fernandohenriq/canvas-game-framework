import { Global } from "src/framework/game";
import { Events } from "../../events";

export class EventTime {
  current: number = 0;
  target: number = 1;
  loops: number = 1;
  onLoop?: (eventTime: this) => any = (eventTime) => console.log(eventTime);
  onFinish?: (eventTime: this) => any = (eventTime) => console.log(eventTime);

  constructor(props: Omit<Partial<PropsOf<EventTime>>, "direction">) {
    Object.assign(this, props);
    Events.eventsLoop.before(this.update.bind(this));
  }

  isFinished() {
    return this.target === this.current;
  }

  private getDirection() {
    const direction = this.target - this.current;
    if (direction === 0) return 0;
    return direction > 0 ? 1 : -1;
  }

  isCurrentLoopCompleted() {
    const direction = this.getDirection();
    let loopCompleted = false;
    if (direction > 0) {
      loopCompleted = this.current >= this.target;
    } else if (direction < 0) {
      loopCompleted = this.current <= this.target;
    }
    return loopCompleted;
  }

  isLoopCompleted = (direction: number) => {
    if (direction > 0) {
      return this.current >= this.target;
    } else if (direction < 0) {
      return this.current <= this.target;
    }
    return false;
  };

  private update() {
    const direction = this.getDirection();
    if (direction === 0) return this;

    const deltaTime = Global.dt;
    const tick = direction * deltaTime;
    this.current += tick;

    const loopCompleted = this.isLoopCompleted.bind(this)(direction);

    console.log(loopCompleted);

    if (loopCompleted) {
      this.loops--;
      this.current = this.target;

      const isLastLoop = this.loops === 0;
      if (isLastLoop) {
        this.onLoop?.(this);
        this.onFinish?.(this);
        return this;
      }

      const hasLoopsLeft = this.loops > 0;
      if (hasLoopsLeft) {
        this.onLoop?.(this);
        return this;
      }

      const isInfinityLoop = this.loops <= -1;
      if (isInfinityLoop) {
        this.onLoop?.(this);
        return this;
      }
    }

    return this;
  }
}

export class EventTimeManager {
  eventTimes: { [key: string]: EventTime } = {};

  add(key: string, eventTime: EventTime) {
    this.eventTimes[key] = eventTime;
  }

  remove(key: string) {
    delete this.eventTimes?.[key];
  }

  finished(key: string) {
    const eventTime = this.eventTimes[key];
    return eventTime?.isFinished();
  }
}
