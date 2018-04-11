/*
 * Gesture Events
 * Version 1.0.0
 * https://github.com/lorenzodianni/gesture-events#readme
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.GestureEvents = {})));
}(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var touch = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Touch = /** @class */ (function () {
	    function Touch(x, y, identifier) {
	        this.clientX = x;
	        this.clientY = y;
	        this.pageX = x;
	        this.pageY = y;
	        this.screenX = x;
	        this.screenY = y;
	        this.identifier = identifier;
	    }
	    return Touch;
	}());
	exports.Touch = Touch;

	});

	unwrapExports(touch);
	var touch_1 = touch.Touch;

	var event = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function createTouchEvent(name, x, y, identifier) {
	    if (identifier === void 0) { identifier = 0; }
	    var event = document.createEvent('Event');
	    event.initEvent(name, true, true);
	    var touch$$1 = new touch.Touch(x, y, identifier);
	    event.touches = event.targetTouches = [touch$$1];
	    event.changedTouches = [touch$$1];
	    return event;
	}
	function dispatchTouchEvent(el, name, x, y, identifier) {
	    var event = createTouchEvent(name, x, y, identifier);
	    el.dispatchEvent(event);
	}
	exports.dispatchTouchEvent = dispatchTouchEvent;

	});

	unwrapExports(event);
	var event_1 = event.dispatchTouchEvent;

	var swipe_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function swipe(el, from, to) {
	    event.dispatchTouchEvent(el, 'touchstart', from.x, from.y);
	    var x = from.x, y = from.y;
	    while (x !== to.x || y !== to.y) {
	        x = x < to.x ? ++x : x > to.x ? --x : x;
	        y = y < to.y ? ++y : y > to.y ? --y : y;
	        event.dispatchTouchEvent(el, 'touchmove', x, y);
	    }
	    event.dispatchTouchEvent(el, 'touchend', to.x, to.y);
	}
	exports.swipe = swipe;

	});

	unwrapExports(swipe_1);
	var swipe_2 = swipe_1.swipe;

	var tap_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function tap(el, position) {
	    event.dispatchTouchEvent(el, 'touchstart', position.x, position.y);
	    event.dispatchTouchEvent(el, 'touchend', position.x, position.y);
	}
	exports.tap = tap;

	});

	unwrapExports(tap_1);
	var tap_2 = tap_1.tap;

	var src = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.swipe = swipe_1.swipe;

	exports.tap = tap_1.tap;

	});

	var index = unwrapExports(src);
	var src_1 = src.swipe;
	var src_2 = src.tap;

	exports.default = index;
	exports.swipe = src_1;
	exports.tap = src_2;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
