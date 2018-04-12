import {Touch} from './touch';

function createTouchEvent(name: EventName, x: number = 0, y: number = 0, identifier: number = 0): Event {
  const event: any = document.createEvent('Event');
  event.initEvent(name, true, true);
  const touch = new Touch(x, y, identifier);
  event.touches = event.targetTouches = [touch];
  event.changedTouches = [touch];
  return event;
}

export type EventName = 'touchstart' | 'touchmove' | 'touchend';

export function dispatchTouchEvent(
  el: HTMLElement | Document,
  name: EventName,
  x?: number,
  y?: number,
  identifier?: number): void {
  const event = createTouchEvent(name, x, y, identifier);
  el.dispatchEvent(event);
}
