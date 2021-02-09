'use strict';
const parseArgs = require('minimist');

const args = parseArgs(process.argv);

const pattern = args.component, // Component group to match
	testToExecute = args.id,    // Specific test ID
	titlePattern = args.title,  // Pattern for matching test case title
	maxInstances = args.instances || 5;  // concurrent instances for 'manual' concurrency

const runTest = ({concurrency, filter, Page, testName, ...rest}) => {
	if (concurrency && (concurrency > maxInstances)) {
		return;
	}

	describe(testName, function () {
		it('should fetch test cases', function () {
			Page.open('?request');
			let testCases = browser.execute(function () {
				return window.__TEST_DATA; // eslint-disable-line no-undef
			});

			expect(testCases).to.be.an('object', 'Test data failed to load');

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
							it(`${component}~/${testName}~/${testCase.title}`, function () {
								const params = Page.serializeParams(Object.assign({
									component,
									testId
								}, rest));

								Page.open(`?${params}`);

								const context = {params, component, testName, url: Page.url};
								this.test.context = context;
								const result = browser.checkDocument();
								expect(result[0].isWithinMisMatchTolerance).to.be.true();
							});
						});
					});
				}
			});
		});
	});
};

module.exports = {
	runTest
};
