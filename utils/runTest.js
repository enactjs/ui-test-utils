import cryptoModule from 'crypto';
import parseArgs from 'minimist';

const args = parseArgs(process.argv);

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

			// Debug: Check if page loaded
			const pageContent = await browser.execute(() => {
				return {
					url: window.location.href,
					readyState: document.readyState,
					bodyLength: document.body.innerHTML.length,
					hasTestData: typeof window.__TEST_DATA,
					testDataValue: window.__TEST_DATA,
					errors: window.__ERROR || null
				};
			});
			console.log('Page state:', JSON.stringify(pageContent, null, 2));

			// Wait for test data to be loaded (Chrome 132 needs more time)
			await browser.waitUntil(
				async () => {
					const testData = await browser.execute(() => window.__TEST_DATA);
					if (testData === null || testData === undefined) {
						console.log('Still waiting for window.__TEST_DATA...');
						return false;
					}
					console.log('window.__TEST_DATA is now available');
					return true;
				},
				{
					timeout: 60000, // Increase to 60 seconds for debugging
					interval: 2000, // Check every 2 seconds
					timeoutMsg: 'Test data (window.__TEST_DATA) was not loaded by the page after 60 seconds'
				}
			);

			let testCases = await browser.execute(function () {
				return window.__TEST_DATA;
			});

			await expect(testCases).toBeInstanceOf(Object);

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
							it(`${component}~/${testName}~/${testCase.title}`, async function () {
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

								await Page.open(`?${params}`);

								expect(await browser.checkScreen(screenshotFileName, {
									disableCSSAnimation: true,
									ignoreAntialiasing: true,
									ignoreNothing: true,
									rawMisMatchPercentage: true,
									waitForFontsLoaded: true
								})).toBe(0);
							});
						});
					});
				}
			});
		});
	});
};