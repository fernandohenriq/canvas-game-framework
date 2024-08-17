import { Global } from "../game/Global";
import { EventManager } from "../utils";

export const GAME_EVENTS = {
  GAME_BEGIN: "gameBegin",
  GAME_END: "gameEnd",
};

export type GameEventCallBack = () => void;

export class GameEvents {
  private eventManager = new EventManager();

  gameBegin(event: GameEventCallBack) {
    this.eventManager.on(GAME_EVENTS.GAME_BEGIN, event);
  }

  gameEnd(event: GameEventCallBack) {
    this.eventManager.on(GAME_EVENTS.GAME_END, event);
  }

  fireGameBegin() {
    this.eventManager.fire(GAME_EVENTS.GAME_BEGIN, Global);
  }

  fireGameEnd() {
    this.eventManager.fire(GAME_EVENTS.GAME_END, Global);
  }
}
