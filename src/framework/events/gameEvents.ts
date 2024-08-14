import { Global } from "../global";
import { EventManager } from "../utils";

export const GAME_EVENTS = {
  GAME_BEGIN: "gameBegin",
  GAME_END: "gameEnd",
};

export type GameEventCallBack = (props: Global) => void;

export class GameEvents {
  private eventManager = new EventManager();

  gameBegin(event: GameEventCallBack) {
    this.eventManager.on(GAME_EVENTS.GAME_BEGIN, event);
  }

  gameEnd(event: GameEventCallBack) {
    this.eventManager.on(GAME_EVENTS.GAME_END, event);
  }

  fireGameBegin(global: Global) {
    this.eventManager.fire(GAME_EVENTS.GAME_BEGIN, global);
  }

  fireGameEnd(global: Global) {
    this.eventManager.fire(GAME_EVENTS.GAME_END, global);
  }
}
