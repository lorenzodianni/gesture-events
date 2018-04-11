import {Pointer} from '..';
import {dispatchTouchEvent} from '../core/event';

export function tap(el: HTMLElement | Document, position: Pointer): void {
  dispatchTouchEvent(el, 'touchstart', position.x, position.y);
  dispatchTouchEvent(el, 'touchend', position.x, position.y);
}
