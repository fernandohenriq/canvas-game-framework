import { DeltaTime } from "./helpers/DeltaTime";
import { Entity, LoopParams } from "./Entity";
import { Game } from "./globals/Game";
import { EntityPool } from "./globals/EntityPool";

export class Room {
  id: string = Math.random().toString(36).substring(2, 15);
  width: number = 0;
  height: number = 0;
  bgColor: string = "#ffffff1e";
  layers = {
    main: {
      entities: [] as Entity[],
    },
  };

  dt: DeltaTime;
  lastTime: number = performance.now();

  constructor(props?: Partial<PropsOf<Room>>) {
    EntityPool.destroyAll();
    this.dt = new DeltaTime({});
    Object.assign(this, props);
    Game.events.emit("roomCreated", this);
  }

  getFps() {
    const fps = 1000 / (performance.now() - this.lastTime);
    this.lastTime = performance.now();
    return fps;
  }

  addEntity(layer: keyof typeof this.layers, entity: Entity) {
    this.layers?.[layer]?.entities?.push?.(entity);
  }

  removeEntity(entityOrId: Entity | string) {
    const entityId =
      typeof entityOrId === "string" ? entityOrId : entityOrId.id;
    Object.values(this.layers).forEach((layer) => {
      layer.entities = layer.entities.filter(
        (entity) => entity.id !== entityId
      );
    });
  }

  loop() {
    // update delta-time
    this.dt.update();

    // clear canvas
    Game.canvas.width = this.width;
    Game.canvas.height = this.height;
    Game.canvas.style.backgroundColor = this.bgColor;
    Game.ctx.clearRect(0, 0, this.width, this.height);

    // set loop params
    const loopParams: LoopParams = {
      dt: this.dt.value,
      ctx: Game.ctx,
    };

    // update loops entities
    Object.values(this.layers).forEach((layer) => {
      // step loops entities
      layer.entities.forEach((entity) => {
        entity?.stepLoop?.(loopParams);
      });
      // draw loops entities
      layer.entities.forEach((entity) => {
        entity?.drawLoop?.(loopParams);
      });
    });
  }
}
