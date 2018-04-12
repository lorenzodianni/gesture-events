import {Pointer as IPointer, EventName as TEventName} from './src';

export as namespace GestureEvents;
export = GestureEvents;

declare namespace GestureEvents {
  export function swipe(el: HTMLElement | Document, from: Pointer, to: Pointer): void;
  export function tap(el: HTMLElement | Document, position: Pointer): void;
  export interface Pointer extends IPointer {}
  export type EventName = TEventName;
}
