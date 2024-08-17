import { EventsLoop } from "./EventsLoop";
import { GameEvents } from "./GameEvents";

export class Events {
  static gameEvents = new GameEvents();
  static eventsLoop = new EventsLoop();
}
