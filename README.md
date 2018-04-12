# Gesture Events
Test utilities that simulate swipe/tap gestures

```ssh
npm install gesture-events --save-dev
```

#### API
```
GestureEvents {
  
  export function swipe(el: HTMLElement | Document, from: Pointer, to: Pointer): void;
  
  export function tap(el: HTMLElement | Document, position?: Pointer): void;
  
  export interface Pointer {x: number, y: number}
  
  export type EventName = 'touchstart' | 'touchmove' | 'touchend';

}
```
<br><br>

## Examples
### swipe
> swipe(el: HTMLElement | Document, from: Pointer, to: Pointer): void
```js
import {swipe, Pointer} from 'gesture-events';

describe('Change background color on document swipe', () => {

  test('should change color if user swipe x more than 30px', () => {
    const from: Pointer = {x: 30, y: 10};
    const to: Pointer = {x: 70, y: 10};

    expect(document.body.style.backgroundColor).toBe('');
    
    swipe(document.body, from, to);
    
    expect(document.body.style.backgroundColor).toBe('red');
  });

});
```

### tap
> tap(el: HTMLElement | Document, position?: Pointer): void
```js
import {tap} from 'gesture-events';

describe('Change background color on document tap', () => {

  test('should change on user tap', () => {

    expect(document.body.style.backgroundColor).toBe('');
    
    tap(document.body);
    
    expect(document.body.style.backgroundColor).toBe('red');
  });

});
```