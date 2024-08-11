export class Input {
  static global = new Input();

  keys: { [key: string]: { status: boolean; prevStatus: boolean } };

  constructor() {
    this.keys = {};
    window.addEventListener("keydown", ({ code }) => this.set(code, true));
    window.addEventListener("keyup", ({ code }) => this.set(code, false));
  }

  protected set(key: string, status: boolean) {
    key = key.replace("Key", "").toUpperCase();
    this.keys[key] = {
      prevStatus: this.keys[key]?.status ?? false,
      status: status,
    };
  }

  protected get(key: string) {
    key = key.replace("Key", "").toUpperCase();
    return this.keys?.[key] ?? { status: false, prevStatus: false };
  }

  protected remove(key: string) {
    delete this.keys[key];
  }

  isKeyPressing(key: string): boolean {
    return !!this.get(key)?.status;
  }

  isKeyPressed(key: string): boolean {
    return !!this.get(key).status && !this.get(key).prevStatus;
  }

  isKeyReleased(key: string): boolean {
    return !this.get(key).status && !!this.get(key).prevStatus;
  }

  isKeyHeld(key: string): boolean {
    return !!this.get(key).status && !!this.get(key).prevStatus;
  }
}
