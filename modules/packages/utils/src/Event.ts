export class EventEmitter {
  events: { [x: string]: Array<(...args: any[]) => void> } = {};
  constructor() {}

  addListener(event: string, listener: (...args: any[]) => void): this {
    let existing = this.events[event];
    if (!existing) {
      this.events[event] = existing = [];
    }
    existing.push(listener);

    return this;
  }
  on(event: string, listener: (...args: any[]) => void): this {
    return this.addListener(event, listener);
  }
  emit(event: string, ...args: any[]): boolean {
    let existing = this.events[event];
    if (!existing) {
      return false;
    }
    existing.forEach(fn => {
      fn(...args);
    });
    return true;
  }
  removeAllListeners(event?: string): this {
    this.events[event] = [];
    return this;
  }

  off(event: string, listener: (...args: any[]) => void): this {
    return this;
  }

  once(event: string, listener: (...args: any[]) => void): this {
    return this;
  }
  prependListener(event: string, listener: (...args: any[]) => void): this {
    return this;
  }
  prependOnceListener(event: string, listener: (...args: any[]) => void): this {
    return this;
  }
  removeListener(event: string, listener: (...args: any[]) => void): this {
    return this;
  }

  setMaxListeners(n: number): this {
    return this;
  }
  getMaxListeners(): number {
    return 0;
  }
  listeners(event: string): Function[] {
    return [];
  }
  rawListeners(event: string): Function[] {
    return [];
  }

  eventNames(): Array<string> {
    return [];
  }
  listenerCount(type: string): number {
    return 0;
  }
}

export const event = new EventEmitter();
