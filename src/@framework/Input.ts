import { Game } from "./globals/Game";

export class Input {
  keys: { [key: string]: { status: boolean; prevStatus: boolean } };
  mouseButtons: { [button: number]: { status: boolean; prevStatus: boolean } };
  mouseX: number = 0;
  mouseY: number = 0;
  mouseWheel: number = 0;

  constructor() {
    this.keys = {};
    this.mouseButtons = {};
    window.addEventListener("keydown", ({ code }) => this.setKey(code, true));
    window.addEventListener("keyup", ({ code }) => this.setKey(code, false));

    // Mouse event listeners
    window.addEventListener("mousemove", (e) => this.updateMousePosition(e));
    window.addEventListener("mousedown", (e) =>
      this.setMouseButton(e.button, true)
    );
    window.addEventListener("mouseup", (e) =>
      this.setMouseButton(e.button, false)
    );
    window.addEventListener("wheel", (e) => this.updateMouseWheel(e));
  }

  // Key methods
  protected setKey(key: string, status: boolean) {
    key = key.replace("Key", "").toUpperCase();
    this.keys[key] = {
      prevStatus: this.keys[key]?.status ?? false,
      status: status,
    };
  }

  protected getKey(key: string) {
    key = key.replace("Key", "").toUpperCase();
    return this.keys?.[key] ?? { status: false, prevStatus: false };
  }

  // Mouse methods
  protected updateMousePosition(e: MouseEvent) {
    const rect = Game.canvas.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  protected setMouseButton(button: number, status: boolean) {
    this.mouseButtons[button] = {
      prevStatus: this.mouseButtons[button]?.status ?? false,
      status: status,
    };
  }

  protected getMouseButton(button: number) {
    return this.mouseButtons[button] ?? { status: false, prevStatus: false };
  }

  protected updateMouseWheel(e: WheelEvent) {
    this.mouseWheel = e.deltaY;
  }

  // Key input methods
  isKeyPressing(key: string): boolean {
    return !!this.getKey(key)?.status;
  }

  isKeyPressed(key: string): boolean {
    return !!this.getKey(key).status && !this.getKey(key).prevStatus;
  }

  isKeyReleased(key: string): boolean {
    return !this.getKey(key).status && !!this.getKey(key).prevStatus;
  }

  isKeyHeld(key: string): boolean {
    return !!this.getKey(key).status && !!this.getKey(key).prevStatus;
  }

  // Mouse input methods
  isMouseButtonPressing(button: number): boolean {
    return !!this.getMouseButton(button)?.status;
  }

  isMouseButtonPressed(button: number): boolean {
    return (
      !!this.getMouseButton(button).status &&
      !this.getMouseButton(button).prevStatus
    );
  }

  isMouseButtonReleased(button: number): boolean {
    return (
      !this.getMouseButton(button).status &&
      !!this.getMouseButton(button).prevStatus
    );
  }

  isMouseButtonHeld(button: number): boolean {
    return (
      !!this.getMouseButton(button).status &&
      !!this.getMouseButton(button).prevStatus
    );
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }

  getMouseWheel(): number {
    const wheel = this.mouseWheel;
    this.mouseWheel = 0; // Reset after reading
    return wheel;
  }

  getMouseDirection(originX: number, originY: number): number {
    const { x: mouseX, y: mouseY } = this.getMousePosition();
    return Math.atan2(mouseY - originY, mouseX - originX);
  }

  // Method to update previous states (call this at the end of each frame)
  updatePrevStates() {
    for (const key in this.keys) {
      this.keys[key].prevStatus = this.keys[key].status;
    }
    for (const button in this.mouseButtons) {
      this.mouseButtons[button].prevStatus = this.mouseButtons[button].status;
    }
  }
}
