import {swipe} from '../src';
import {Touch} from '../src/core/touch';

describe('swipe', () => {
  const from = {x: 30, y: 10};
  const to = {x: 50, y: 12};

  test('touchstart', () => {
    let eventType: string | null = null;
    let eventTouch: Touch;
    const testEvent: string = 'touchstart';
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventType = type;
      eventTouch = touches[0];
    };
    document.addEventListener(testEvent, catchEvent);
    swipe(document.body, from, to);
    expect(eventType).toBe(testEvent);
    expect(eventTouch.clientX).toBe(from.x);
    expect(eventTouch.clientY).toBe(from.y);
    expect(eventTouch.pageX).toBe(from.x);
    expect(eventTouch.pageY).toBe(from.y);
    expect(eventTouch.screenX).toBe(from.x);
    expect(eventTouch.screenY).toBe(from.y);
    expect(eventTouch.identifier).toBe(0);
    document.removeEventListener(testEvent, catchEvent);
  });

  test('touchmove positive', () => {
    let eventTypes: string[] = [];
    let eventTouches: Touch[] = [];
    const _from = {x: 30, y: 10};
    const _to = {x: 50, y: 12};
    const movementX: number = Math.abs(_from.x - _to.x);
    const movementY: number = Math.abs(_from.y - _to.y);
    const movementNumber = Math.max(movementX, movementY);
    const testEvent: string = 'touchmove';
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventTypes.push(type);
      eventTouches.push(touches[0]);
    };
    document.addEventListener(testEvent, catchEvent);
    swipe(document.body, _from, _to);
    expect(eventTypes.length).toBe(movementNumber);
    expect(eventTypes.every(e => e === testEvent)).toBe(true);
    expect(eventTouches.length).toBe(movementNumber);
    eventTouches.forEach((eventTouch, i) => {
      const movement = i + 1;
      const hasMovementX = movement <= movementX;
      const hasMovementY = movement <= movementY;
      hasMovementX && expect(eventTouch.clientX).toBe(_from.x + movement);
      hasMovementY && expect(eventTouch.clientY).toBe(_from.y + movement);
      hasMovementX && expect(eventTouch.pageX).toBe(_from.x + movement);
      hasMovementY && expect(eventTouch.pageY).toBe(_from.y + movement);
      hasMovementX && expect(eventTouch.screenX).toBe(_from.x + movement);
      hasMovementY && expect(eventTouch.screenY).toBe(_from.y + movement);
      expect(eventTouch.identifier).toBe(0);
    });
    document.removeEventListener(testEvent, catchEvent);
  });

  test('touchmove negative', () => {
    let eventTypes: string[] = [];
    let eventTouches: Touch[] = [];
    const _from = {x: 30, y: 10};
    const _to = {x: 28, y: 7};
    const testEvent: string = 'touchmove';
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventTypes.push(type);
      eventTouches.push(touches[0]);
    };
    document.addEventListener(testEvent, catchEvent);
    swipe(document.body, _from, _to);
    expect(eventTypes.length).toBe(3);
    expect(eventTypes.every(e => e === testEvent)).toBe(true);
    expect(eventTouches.length).toBe(3);
    expect(eventTouches[0].clientX).toBe(29);
    expect(eventTouches[0].clientY).toBe(9);
    expect(eventTouches[0].identifier).toBe(0);
    expect(eventTouches[1].clientX).toBe(28);
    expect(eventTouches[1].clientY).toBe(8);
    expect(eventTouches[1].identifier).toBe(0);
    expect(eventTouches[2].clientX).toBe(28);
    expect(eventTouches[2].clientY).toBe(7);
    expect(eventTouches[2].identifier).toBe(0);
    document.removeEventListener(testEvent, catchEvent);
  });

  test('touchend', () => {
    let eventType: string | null = null;
    let eventTouch: Touch;
    const testEvent: string = 'touchend';
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventType = type;
      eventTouch = touches[0];
    };
    document.addEventListener(testEvent, catchEvent);
    swipe(document.body, from, to);
    expect(eventType).toBe(testEvent);
    expect(eventTouch.clientX).toBe(to.x);
    expect(eventTouch.clientY).toBe(to.y);
    expect(eventTouch.pageX).toBe(to.x);
    expect(eventTouch.pageY).toBe(to.y);
    expect(eventTouch.screenX).toBe(to.x);
    expect(eventTouch.screenY).toBe(to.y);
    expect(eventTouch.identifier).toBe(0);
    document.removeEventListener(testEvent, catchEvent);
  });

  test('gesture', () => {
    let eventTypes: string[] = [];
    let eventTouches: Touch[] = [];
    const movementX: number = Math.abs(from.x - to.x);
    const movementY: number = Math.abs(from.y - to.y);
    const movementNumber = Math.max(movementX, movementY) + 2;
    const isFirst = (i: number): boolean => i === 0;
    const isLast = (i: number, array: any[]): boolean => i + 1 === array.length;
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventTypes.push(type);
      eventTouches.push(touches[0]);
    };
    document.addEventListener('touchstart', catchEvent);
    document.addEventListener('touchmove', catchEvent);
    document.addEventListener('touchend', catchEvent);
    swipe(document.body, from, to);
    expect(eventTypes.length).toBe(movementNumber);
    expect(eventTypes[0]).toBe('touchstart');
    expect(eventTypes.every((e, i) => {
      if (isFirst(i) || isLast(i, eventTypes)) {
        return true;
      }
      return e === 'touchmove';
    })).toBe(true);
    expect(eventTypes[eventTypes.length - 1]).toBe('touchend');
    expect(eventTouches.length).toBe(movementNumber);
    eventTouches.forEach((eventTouch, i) => {
      if (isFirst(i)) {
        expect(eventTouch.clientX).toBe(from.x);
        expect(eventTouch.clientY).toBe(from.y);
        expect(eventTouch.pageX).toBe(from.x);
        expect(eventTouch.pageY).toBe(from.y);
        expect(eventTouch.screenX).toBe(from.x);
        expect(eventTouch.screenY).toBe(from.y);
      } else if (isLast(i, eventTouches)) {
        expect(eventTouch.clientX).toBe(to.x);
        expect(eventTouch.clientY).toBe(to.y);
        expect(eventTouch.pageX).toBe(to.x);
        expect(eventTouch.pageY).toBe(to.y);
        expect(eventTouch.screenX).toBe(to.x);
        expect(eventTouch.screenY).toBe(to.y);
      } else {
        const movement = i + 1;
        const hasMovementX = movement <= movementX;
        const hasMovementY = movement <= movementY;
        const isInRange = (prop: string, type: string) => eventTouch[prop] > from[type] && eventTouch[prop] < to[type];
        hasMovementX && expect(isInRange('clientX', 'x')).toBe(true);
        hasMovementY && expect(isInRange('clientY', 'y')).toBe(true);
        hasMovementX && expect(isInRange('pageX', 'x')).toBe(true);
        hasMovementY && expect(isInRange('pageY', 'y')).toBe(true);
        hasMovementX && expect(isInRange('screenX', 'x')).toBe(true);
        hasMovementY && expect(isInRange('screenY', 'y')).toBe(true);
      }
      expect(eventTouch.identifier).toBe(0);
    });
    document.removeEventListener('touchstart', catchEvent);
    document.removeEventListener('touchmove', catchEvent);
    document.removeEventListener('touchend', catchEvent);
  });
});
