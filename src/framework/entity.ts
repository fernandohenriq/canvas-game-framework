import { Global, Sprite } from ".";
import { Events } from "./events/events";

export abstract class Entity {
  sprite: Sprite = new Sprite();
  x: number = 0;
  y: number = 0;
  xSpd: number = 0;
  ySpd: number = 0;

  constructor() {
    // Register the events
    Events.eventsLoop.step(this.stepEvent.bind(this));
    Events.eventsLoop.draw(this.drawEvent.bind(this));
  }

  abstract stepEvent(props: Global): void;
  abstract drawEvent(props: Global): void;

  destroy() {
    Events.eventsLoop.unregisterAll(this.stepEvent.bind(this));
    Events.eventsLoop.unregisterAll(this.drawEvent.bind(this));
  }
}
