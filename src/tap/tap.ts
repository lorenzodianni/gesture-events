import {Pointer} from '..';
import {dispatchTouchEvent} from '../core/event';

export function tap(el: HTMLElement | Document, position?: Pointer): void {
  const x = position && position.x;
  const y = position && position.y;
  dispatchTouchEvent(el, 'touchstart', x, y);
  dispatchTouchEvent(el, 'touchend', x, y);
}
