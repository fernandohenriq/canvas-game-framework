import { Global } from "../game/Global";
import { EventManager } from "../utils";

export const EVENT_LOOP = {
  BEFORE: "beforeEvent",
  GAME: "gameEvent",
  STEP: "stepEvent",
  DRAW: "drawEvent",
  AFTER: "afterEvent",
};

export type EventsLoopCallBack = () => void;

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

  unregisterBefore(callback: EventsLoopCallBack) {
    this.eventManager.off(EVENT_LOOP.BEFORE, callback);
  }

  unregisterGame(callback: EventsLoopCallBack) {
    this.eventManager.off(EVENT_LOOP.GAME, callback);
  }

  unregisterStep(callback: EventsLoopCallBack) {
    this.eventManager.off(EVENT_LOOP.STEP, callback);
  }

  unregisterDraw(callback: EventsLoopCallBack) {
    this.eventManager.off(EVENT_LOOP.DRAW, callback);
  }

  unregisterAfter(callback: EventsLoopCallBack) {
    this.eventManager.off(EVENT_LOOP.AFTER, callback);
  }

  fireAll() {
    this.eventManager.fire(EVENT_LOOP.BEFORE, Global);
    this.eventManager.fire(EVENT_LOOP.GAME, Global);
    this.eventManager.fire(EVENT_LOOP.STEP, Global);
    this.eventManager.fire(EVENT_LOOP.DRAW, Global);
    this.eventManager.fire(EVENT_LOOP.AFTER, Global);
  }

  unregisterAll(callback: EventsLoopCallBack) {
    this.eventManager.off(EVENT_LOOP.BEFORE, callback);
    this.eventManager.off(EVENT_LOOP.GAME, callback);
    this.eventManager.off(EVENT_LOOP.STEP, callback);
    this.eventManager.off(EVENT_LOOP.DRAW, callback);
    this.eventManager.off(EVENT_LOOP.AFTER, callback);
  }
}
