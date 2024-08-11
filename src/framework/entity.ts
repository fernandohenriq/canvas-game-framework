import { Global, global, Sprite } from ".";

export abstract class Entity {
  sprite: Sprite = new Sprite();
  x: number = 0;
  y: number = 0;
  xSpd: number = 0;
  ySpd: number = 0;

  constructor() {
    // Register the events
    global.events.step.on("stepEvent", this.stepEvent.bind(this));
    global.events.draw.on("drawEvent", this.drawEvent.bind(this));
  }

  abstract stepEvent(eventProps: Global): void;
  abstract drawEvent(eventProps: Global): void;
}
