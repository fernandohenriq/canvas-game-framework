export interface GameState {
  enter(): void;
  update(deltaTime: number): void;
  exit(): void;
}

export class StateMachine {
  private states: { [name: string]: GameState } = {};
  private currentState: GameState | null = null;

  addState(name: string, state: GameState): void {
    this.states[name] = state;
  }

  setState(name: string): void {
    if (this.currentState) {
      this.currentState.exit();
    }
    this.currentState = this.states[name];
    if (this.currentState) {
      this.currentState.enter();
    }
  }

  update(deltaTime: number): void {
    if (this.currentState) {
      this.currentState.update(deltaTime);
    }
  }
}
