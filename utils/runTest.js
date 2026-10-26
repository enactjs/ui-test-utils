import cryptoModule from 'crypto';
import parseArgs from 'minimist';

const args = parseArgs(typeof process !== 'undefined' && process.argv ? process.argv : []);

const pattern = args.component, // Component group to match
	testToExecute = args.id,    // Specific test ID
	titlePattern = args.title,  // Pattern for matching test case title
	maxInstances = args.instances || 5;  // concurrent instances for 'manual' concurrency

export const runTest = ({concurrency, filter, Page, testName, ...rest}) => {
	if (concurrency && (concurrency > maxInstances)) {
		return;
	}

	describe(testName, function () {
		it('should fetch test cases', async function () {
			await Page.open('?request');

			const readPageState = function () {
				const scripts = [];
				for (let i = 0; i < document.scripts.length; i++) {
					scripts.push(document.scripts[i].src || document.scripts[i].getAttribute('src') || '');
				}
				return {
					testCases: window.__TEST_DATA,
					loadError: window.__TEST_LOAD_ERROR || null,
					booted: window.__TEST_BOOT === true,
					href: window.location.href,
					title: document.title,
					readyState: document.readyState,
					scripts: scripts,
					body: (document.body && document.body.textContent || '').slice(0, 500)
				};
			};

			// Classic WebDriver cannot serialize Promises; keep this callback sync.
			// Production framework + view bundles can still take a while to evaluate in CI.
			try {
				await browser.waitUntil(async function () {
					return await browser.execute(function () {
						return window.__TEST_DATA != null || window.__TEST_LOAD_ERROR != null;
					});
				}, {
					timeout: 60000,
					timeoutMsg: 'timed out waiting for window.__TEST_DATA'
				});
			} catch (err) {
				const failedState = await browser.execute(readPageState);
				throw new Error(err.message + ' page=' + JSON.stringify(failedState));
			}

			const pageState = await browser.execute(readPageState);

			expect(pageState.loadError).toBeNull();
			await expect(pageState.testCases).toBeInstanceOf(Object);

			const testCases = pageState.testCases;

			describe(testName, function () {
				for (const component in testCases) {
					if (pattern && !component.match(pattern)) {
						continue;
					}
					if (filter && !component.match(filter)) {
						continue;
					}

					describe(component, function () {
						testCases[component].forEach((testCase, testId) => {
							if (concurrency && testId % maxInstances !== concurrency - 1) {
								return;
							}
							if (testToExecute >= 0 && testToExecute !== testId) {
								return;
							}
							if (titlePattern && !testCase.title.match(titlePattern)) {
								return;
							}
							const componentTest = it(`${component}~/${testName}~/${testCase.title}`, async function () {
								const params = Page.serializeParams(Object.assign({
									component,
									testId
								}, rest));

								const testNameParts = testCase.title.split('~/');
								let testCaseName = testNameParts.pop();
								// Replace problematic filenames. Windows is much more restrictive.
								testCaseName = testCaseName.replace(/[/\\:?*"|<>]/g, '_');
								// shorten the name with a bit of leading context to help find the file manually if necessary
								testCaseName = testCaseName.substring(0, 128) + '-' + cryptoModule.createHash('md5').update(testCaseName).digest('hex');
								const screenshotFileName = (component + '/' + testName + '/' + testCaseName);

								const context = {params, component, testName, url: Page.url, fileName: screenshotFileName};
								this.test.context = context;
								this.portrait = !!testCase.portrait; // Used when screenshots are compared; otherwise, it may compare portrait with landscape

								await Page.open(`?${params}`);

								expect(await browser.checkScreen(screenshotFileName, {
									disableCSSAnimation: true,
									ignoreAntialiasing: true,
									ignoreNothing: true,
									rawMisMatchPercentage: true,
									// Page.open already waits for fonts with a timeout.
									// The visual-service wait has no timeout and can hang on ar-SA.
									waitForFontsLoaded: false
								})).toBe(0);
							});
							// Used for creating references for portrait mode; otherwise, references for portrait mode may not be saved
							componentTest.portrait = !!testCase.portrait;
						});
					});
				}
			});
		});
	});
};
