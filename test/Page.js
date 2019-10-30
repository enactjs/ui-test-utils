'use strict';

class Page {
	constructor () {
		this.title = 'Untitled Test';
	}

	open (appPath, urlExtra = '?locale=en-US') {
		const url = `/${appPath}/${urlExtra}`;
		// Can't resize browser window when connected to remote debugger!
		if (!browser._options || !browser._options.remote) {
			browser.setViewportSize({
				width: 1920,
				height: 1080
			});
		}
		browser.url(url);
	}

	delay (delay = 1000) {
		browser.pause(delay);
		return browser;
	}
	keyDelay (key, delay = 50) {
		browser.keys(key);
		browser.pause(delay);
		return browser;
	}
	spotlightLeft () {
		return this.keyDelay('Left arrow');
	}
	spotlightRight () {
		return this.keyDelay('Right arrow');
	}
	spotlightUp () {
		return this.keyDelay('Up arrow');
	}
	spotlightDown () {
		return this.keyDelay('Down arrow');
	}
	spotlightSelect () {
		return this.keyDelay('Enter');
	}
	backKey () {
		return this.keyDelay('Escape');
	}

	pageUp () {
		return this.keyDelay('PageUp');
	}

	pageDown () {
		return this.keyDelay('PageDown');
	}

	// For testing "pointer off" by timeout.
	hidePointerByKeycode () {
		browser.execute(function () {
			const event = document.createEvent('Events');
			event.initEvent('keydown', true, true);
			event.keyCode = 1537;
			document.getElementById('root').dispatchEvent(event);
		});
		this.delay();
		return browser;
	}

	/* global document */
	showPointerByKeycode () {
		browser.execute(function () {
			const event = document.createEvent('Events');
			event.initEvent('keydown', true, true);
			event.keyCode = 1536;
			document.getElementById('root').dispatchEvent(event);
		});
		this.delay();
		return browser;
	}

	/* global WheelEvent */
	mouseWheel (_deltaY, _element) {
		browser.execute(function (deltaY, element = document.body) {
			const {x: clientX, y: clientY} = element.getBoundingClientRect();
			const payload = {view: window, bubbles: true, cancelable: true, clientX, clientY, deltaY};
			const event = new WheelEvent('wheel', payload);
			element.dispatchEvent(event);
		}, _deltaY, _element ? _element.value : null);
	}

	windowSpotlightBlur () {
		browser.execute(
			function () {
				const event = document.createEvent('Events');
				event.initEvent('blur', true, true);
				document.getElementById('root').dispatchEvent(event);
			}
		);

	}
	windowSpotlightFocus () {
		browser.execute(
			function () {
				const event = document.createEvent('Events');
				event.initEvent('focus', true, true);
				document.getElementById('root').dispatchEvent(event);
			}
		);
	}

	/* global window */
	waitTransitionEnd (delay = 3000, msg = 'timed out waiting for transitionend', callback) {
		browser.execute(
			function () {
				window.ontransitionend = function () {
					window.__transition = true;
				};
				window.__transition = false;
			}
		);
		if (callback) {
			callback();
		}
		browser.waitUntil(
			function () {
				return browser.execute(
					function () {
						return window.__transition;
					}
				).value;
			},
			delay,
			msg
		);
	}
}

module.exports = Page;
