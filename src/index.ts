import { Game, Room } from "./@framework";
import { Unit } from "./Unit";

Game.start();

Game.currentRoom = new Room({
  width: 400,
  height: 300,
});

new Unit({ x: 100, y: 100 });
