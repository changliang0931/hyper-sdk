export interface EventFilter {
  address?: string;
  topics?: Array<string | Array<string> | null>;
}
export type EventType = "tx"|"block"|"network";

export type Listener = (...args: Array<any>) => void;

export class HyperEvent {
  readonly listener: Listener;
  readonly once: boolean;
  readonly type: EventType;
  readonly tag: String;
  readonly interval: number;
  _poller: NodeJS.Timer | null;
  constructor(type: EventType, tag: String, listener: Listener, once: boolean) {
    this.listener = listener;
    this.tag = tag;
    this.once = once;
    this.type = type;
    this.interval = 1000;
    this._poller = null;
  }

  on():void{
    this._poller = setInterval(() => {
      this.poll();
    }, this.interval);
  }

  //子类需要重写这个函数
  async poll(): Promise<void> {
    this.emit(this.tag,123);
    if(this.once){
        if(this._poller){
            clearInterval(this._poller);
        }
    }
  }

  emit(eventName: String, ...args: Array<any>): boolean {
    this.listener.apply(eventName, args);
    return true;
  }
}
