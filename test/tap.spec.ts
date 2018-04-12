import {EventName, tap} from '../index';
import {Touch} from '../src/core/touch';

describe('tap', () => {

  test('touchstart', () => {
    let eventType: string = '';
    let eventTouch: Touch | any = {};
    const testEvent: EventName = 'touchstart';
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventType = type;
      eventTouch = touches[0];
    };
    document.addEventListener(testEvent, catchEvent);
    tap(document.body);
    expect(eventType).toBe(testEvent);
    expect(eventTouch.clientX).toBe(0);
    expect(eventTouch.clientY).toBe(0);
    expect(eventTouch.pageX).toBe(0);
    expect(eventTouch.pageY).toBe(0);
    expect(eventTouch.screenX).toBe(0);
    expect(eventTouch.screenY).toBe(0);
    expect(eventTouch.identifier).toBe(0);
    tap(document.body, {x: 50, y: 200});
    expect(eventType).toBe(testEvent);
    expect(eventTouch.clientX).toBe(50);
    expect(eventTouch.clientY).toBe(200);
    expect(eventTouch.pageX).toBe(50);
    expect(eventTouch.pageY).toBe(200);
    expect(eventTouch.screenX).toBe(50);
    expect(eventTouch.screenY).toBe(200);
    expect(eventTouch.identifier).toBe(0);
    document.removeEventListener(testEvent, catchEvent);
  });

  test('touchend', () => {
    let eventType: string = '';
    let eventTouch: Touch | any = {};
    const testEvent: EventName = 'touchend';
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventType = type;
      eventTouch = touches[0];
    };
    document.addEventListener(testEvent, catchEvent);
    tap(document.body);
    expect(eventType).toBe(testEvent);
    expect(eventTouch.clientX).toBe(0);
    expect(eventTouch.clientY).toBe(0);
    expect(eventTouch.pageX).toBe(0);
    expect(eventTouch.pageY).toBe(0);
    expect(eventTouch.screenX).toBe(0);
    expect(eventTouch.screenY).toBe(0);
    expect(eventTouch.identifier).toBe(0);
    tap(document.body, {x: 50, y: 200});
    expect(eventType).toBe(testEvent);
    expect(eventTouch.clientX).toBe(50);
    expect(eventTouch.clientY).toBe(200);
    expect(eventTouch.pageX).toBe(50);
    expect(eventTouch.pageY).toBe(200);
    expect(eventTouch.screenX).toBe(50);
    expect(eventTouch.screenY).toBe(200);
    expect(eventTouch.identifier).toBe(0);
    document.removeEventListener(testEvent, catchEvent);
  });

  test('gesture', () => {
    let eventTypes: string[] = [];
    let eventTouches: Touch[] = [];
    const catchEvent = ({type, touches}: TouchEvent) => {
      eventTypes.push(type);
      eventTouches.push(touches[0]);
    };
    document.addEventListener('touchstart', catchEvent);
    document.addEventListener('touchend', catchEvent);
    tap(document.body, {x: 10, y: 5});
    expect(eventTypes[0]).toBe('touchstart');
    expect(eventTypes[1]).toBe('touchend');
    expect(eventTouches[0].clientX).toBe(10);
    expect(eventTouches[0].clientY).toBe(5);
    expect(eventTouches[0].pageX).toBe(10);
    expect(eventTouches[0].pageY).toBe(5);
    expect(eventTouches[0].screenX).toBe(10);
    expect(eventTouches[0].screenY).toBe(5);
    expect(eventTouches[0].identifier).toBe(0);
    expect(eventTouches[1].clientX).toBe(10);
    expect(eventTouches[1].clientY).toBe(5);
    expect(eventTouches[1].pageX).toBe(10);
    expect(eventTouches[1].pageY).toBe(5);
    expect(eventTouches[1].screenX).toBe(10);
    expect(eventTouches[1].screenY).toBe(5);
    expect(eventTouches[1].identifier).toBe(0);
    document.removeEventListener('touchstart', catchEvent);
    document.removeEventListener('touchend', catchEvent);
  });
});
