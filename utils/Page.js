'use strict';

const queryString = require('query-string');

class Page {
	constructor () {
		this.title = 'Untitled Test';
		this._url = '';
	}

	get url () {
		return this._url;
	}

	async open (appPath, urlExtra = '?locale=en-US') {
		this._url = `/${appPath}/${urlExtra}`;
		// Can't resize browser window when connected to remote debugger!
		if (!browser._options || !browser._options.remote) {
			await browser.setWindowSize(1920, 1080);
		}

		await browser.url(this.url);

		const body = await $('body');
		await body.waitForExist({timeout: 1000});
	}

	serializeParams (params) {
		const queryObject =  queryString.stringify(params);

		return queryObject;
	}

	async delay (delay = 1000) {
		await browser.pause(delay);
		return browser;
	}
	async keyDelay (key, delay = 50) {
		await browser.keys(key);
		await browser.pause(delay);
		return await browser;
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
	async hidePointerByKeycode () {
		browser.execute(function () {
			const event = document.createEvent('Events');
			event.initEvent('keydown', true, true);
			event.keyCode = 1537;
			document.getElementById('root').dispatchEvent(event);
		});
		await this.delay();
		return browser;
	}

	async showPointerByKeycode () {
		await browser.execute(function () {
			const event = document.createEvent('Events');
			event.initEvent('keydown', true, true);
			event.keyCode = 1536;
			document.getElementById('root').dispatchEvent(event);
		});
		await this.delay();
		return browser;
	}

	/* global WheelEvent */
	// Not fully functional - do not use further - see [ENYO-6178] - kept a few existing TCs as-is
	// Do not delete
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

	/**
	 * Wait for an element to appear and become focused
	 *
	 * @param {Element} target                      Target element to match
	 * @param {Object} [config]                     Optional configuration
	 * @param {String} [config.targetName="item"]   Human readable name for target, used in default `timeoutMsg`
	 * @param {String} [config.timeoutMsg=`timed out waiting for ${targetName} focused`]  Error message on timeout
	 * @param {Number} [config.timeout=1200]        Time to wait for focus condition
	 * @param {Number} [config.interval=200]        Time between checks
	 */
	async waitForFocused (target, {targetName = 'item', timeoutMsg = `timed out waiting for ${targetName} focused`, timeout = 1200, interval = 200} = {}) {
		await browser.waitUntil(() => target.isExisting() && target.isFocused(), {timeout, timeoutMsg, interval});
	}

	async waitTransitionEnd (delay = 3000, msg = 'timed out waiting for transitionend', callback, ignore = ['opacity', 'filter']) {
		await browser.execute(
			// eslint-disable-next-line no-shadow
			function (ignore) {
				window.ontransitionend = function (evt) {
					if (!ignore || ignore.indexOf(evt.propertyName) === -1) {
						window.__transition = true;
					}
				};
				window.__transition = false;
			},
			ignore
		);
		if (callback) {
			callback();
		}
		await browser.waitUntil(
			function () {
				return browser.execute(
					function () {
						return window.__transition;
					}
				);
			},
			delay,
			msg
		);
	}
}

module.exports = {
	Page
};
