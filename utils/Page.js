import queryString from 'query-string';

export class Page {
	constructor () {
		this.title = 'Untitled Test';
		this._url = '';
	}

	get url () {
		return this._url;
	}

	async open (appPath, urlExtra = '?locale=en-US') {
		this._url = `/${appPath}/${urlExtra}`;

		const maxAttempts = 2;

		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			try {
				await browser.url(this.url);

				// Wait for page to be ready
				await browser.waitUntil(
					async () => {
						try {
							const state = await browser.execute(() => document.readyState);
							return state === 'complete' || state === 'interactive';
						} catch (e) {
							return false;
						}
					},
					{
						timeout: 30000, // Longer timeout for Chrome 132
						timeoutMsg: `Page did not become ready: ${this.url}`
					}
				);

				// Small pause to let Chrome 132 settle
				await browser.pause(200);

				// Clear body content using async execution (more reliable in Chrome 132)
				await browser.executeAsync((done) => {
					window.requestAnimationFrame(() => {
						window.requestAnimationFrame(() => {
							document.body.innerHTML = '';
							done();
						});
					});
				});

				// Wait for body to be displayed
				const body = await $('body');
				await body.waitForDisplayed({timeout: 10000});

				// Small final pause
				await browser.pause(100);

				// Success - exit retry loop
				return;

			} catch (error) {
				console.log(`Navigation attempt ${attempt}/${maxAttempts} failed: ${error.message}`);

				if (attempt === maxAttempts) {
					// All retries exhausted - throw error
					throw error;
				}

				// Quick recovery attempt before next retry
				try {
					await browser.execute(() => window.stop());
				} catch (e) {
					// Ignore
				}

				// Exponential backoff
				await browser.pause(1000 * attempt);
			}
		}
	}

	serializeParams (params) {
		const queryObject = queryString.stringify(params);

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
		await browser.execute(function () {
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

	async waitTransitionEnd (timeout = 3000, timeoutMsg = 'timed out waiting for transitionend', callback, ignore = ['opacity', 'filter']) {
		await browser.execute(
			// eslint-disable-next-line no-shadow
			async function (ignore) {
				window.ontransitionend = await function (evt) {
					if (!ignore || ignore.indexOf(evt.propertyName) === -1) {
						window.__transition = true;
					}
				};
				window.__transition = false;
			},
			ignore
		);
		if (callback) {
			await callback();
		}
		await browser.waitUntil(
			async function () {
				return await browser.execute(
					async function () {
						return await window.__transition;
					}
				);
			},
			{timeout, timeoutMsg}
		);
	}
}
