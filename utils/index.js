const {generateTestData} = require('./generateTestData');
const {Page} = require('./Page');
const {runTest} = require('./runTest');
const {
	componentSelector,
	element,
	expectOrdering,
	getComponent,
	getSubComponent,
	getText,
	hasClass
} = require('./selector');
const {generateDate, urlParamsToObject} = require('./qs');

module.exports = {
	componentSelector,
	element,
	expectOrdering,
	generateDate,
	generateTestData,
	getComponent,
	getSubComponent,
	getText,
	hasClass,
	runTest,
	Page,
	urlParamsToObject
};
