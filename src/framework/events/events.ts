import { EventsLoop } from "./eventsLoop";
import { GameEvents } from "./gameEvents";

export class Events {
  static gameEvents = new GameEvents();
  static eventsLoop = new EventsLoop();
}
