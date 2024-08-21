import { Game } from "./globals/Game";
import { Id } from "./helpers/Id";

export type LoopParams = {
  dt: number;
  ctx: CanvasRenderingContext2D;
};

export type IEntity = {
  id: string;
  x: number;
  y: number;
  stepLoop?: (params: LoopParams) => void | Promise<void>;
  drawLoop?: (params: LoopParams) => void | Promise<void>;
  destroy: () => void;
};

export abstract class Entity implements IEntity {
  id = Id.generateIncrementalId();
  x: number = 0;
  y: number = 0;

  constructor(props?: Partial<PropsOf<Entity>>) {
    Object.assign(this, props);
    Game.events.emit("entityCreated", this);
  }

  abstract stepLoop?(params: LoopParams): void | Promise<void>;
  abstract drawLoop?(params: LoopParams): void | Promise<void>;

  destroy() {
    Game.events.emit("entityDestroyed", this);
  }
}
