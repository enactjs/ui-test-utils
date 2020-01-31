'use strict';
const parseArgs = require('minimist');

const args = parseArgs(process.argv);

const pattern = args.component, // Component group to match
	testToExecute = args.id, // Specific test ID
	titlePattern = args.title; // Pattern for matching test case title

const runTest = ({testName, Page, skin, ...rest}) => {
	describe(testName, function () {
		it('should fetch test cases', function () {
			Page.open('?request');
			let testCases = browser.execute(function () {
				return window.__TEST_DATA; // eslint-disable-line no-undef
			}).value;

			expect(testCases).to.be.an('object', 'Test data failed to load');

			describe(testName, function () {
				for (const component in testCases) {
					if (pattern && !component.match(pattern)) {
						continue;
					}

					describe(component, function () {
						testCases[component].forEach((testCase, testId) => {
							if (testToExecute >= 0 && testToExecute !== testId) {
								return;
							}
							if (titlePattern && !testCase.title.match(titlePattern)) {
								return;
							}
							it(`${component}/${testName}/${testCase.title}`, function () {
								const params = Page.serializeParams({
									component,
									testId,
									skin,
									...rest
								});
								const context = {params, component, testName};
								this.test.context = context;

								Page.open(`?${params}`);

								let result = browser.checkDocument();
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
