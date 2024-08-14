import { Global } from "../game/global";
import { EventManager } from "../utils";

export const EVENT_LOOP = {
  BEFORE: "beforeEvent",
  GAME: "gameEvent",
  STEP: "stepEvent",
  DRAW: "drawEvent",
  AFTER: "afterEvent",
};

export type EventsLoopCallBack = (global: Global) => void;

export class EventsLoop {
  private eventManager = new EventManager();

  before(callback: EventsLoopCallBack) {
    this.eventManager.on(EVENT_LOOP.BEFORE, callback);
  }
  game(callback: EventsLoopCallBack) {
    this.eventManager.on(EVENT_LOOP.GAME, callback);
  }
  step(callback: EventsLoopCallBack) {
    this.eventManager.on(EVENT_LOOP.STEP, callback);
  }
  draw(callback: EventsLoopCallBack) {
    this.eventManager.on(EVENT_LOOP.DRAW, callback);
  }
  after(callback: EventsLoopCallBack) {
    this.eventManager.on(EVENT_LOOP.AFTER, callback);
  }

  fireAll(global: Global) {
    this.eventManager.fire(EVENT_LOOP.BEFORE, global);
    this.eventManager.fire(EVENT_LOOP.GAME, global);
    this.eventManager.fire(EVENT_LOOP.STEP, global);
    this.eventManager.fire(EVENT_LOOP.DRAW, global);
    this.eventManager.fire(EVENT_LOOP.AFTER, global);
  }

  unregisterAll(callback: EventsLoopCallBack) {
    this.eventManager.off(EVENT_LOOP.BEFORE, callback);
    this.eventManager.off(EVENT_LOOP.GAME, callback);
    this.eventManager.off(EVENT_LOOP.STEP, callback);
    this.eventManager.off(EVENT_LOOP.DRAW, callback);
    this.eventManager.off(EVENT_LOOP.AFTER, callback);
  }
}
