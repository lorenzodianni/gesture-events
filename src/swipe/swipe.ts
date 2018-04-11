import {Pointer} from '..';
import {dispatchTouchEvent} from '../core/event';

export function swipe(el: HTMLElement | Document, from: Pointer, to: Pointer): void {
  dispatchTouchEvent(el, 'touchstart', from.x, from.y);
  let {x, y} = from;
  while (x !== to.x || y !== to.y) {
    x = x < to.x ? ++x : x > to.x ? --x : x;
    y = y < to.y ? ++y : y > to.y ? --y : y;
    dispatchTouchEvent(el, 'touchmove', x, y);
  }
  dispatchTouchEvent(el, 'touchend', to.x, to.y);
}
