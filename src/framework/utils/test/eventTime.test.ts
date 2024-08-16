import { describe, it, expect, beforeEach } from "vitest";
import { Global } from "src/framework/game";
import { EventTime } from "./eventTime";
import { createCanvas } from "canvas";

describe("EventTime", () => {
  beforeEach(() => {
    // Reset the global context before each test
    Global.canvas = createCanvas(window.innerWidth, window.innerHeight) as any;
    Global.ctx = Global.canvas.getContext("2d")!;
    Global.dt = 0.016; // simulate a frame rate of ~60fps
  });

  it("should correctly update current time towards target", () => {
    const eventTime = new EventTime({
      current: 0,
      target: 100,
      loops: 1,
    });

    // Simulate an update
    Global.dt = 1; // 1 second has passed

    eventTime["update"]();

    // since dt is 1, current should increase by 1
    expect(eventTime.current).toBe(1);
  });

  it("should finish when target is reached", () => {
    const eventTime = new EventTime({
      current: 0,
      target: 1,
      loops: 1,
      onLoop: () => console.log("onLoop"),
      onFinish: () => console.log("onFinish"),
    });

    Global.dt = 1; // 1 second per frame

    // simulate update 2 times = 2 seconds = 2 loops
    eventTime["update"]();
    eventTime["update"]();

    expect(eventTime.isFinished()).toBe(true);
    expect(eventTime.current).toBe(1);
  });
});
