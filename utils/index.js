// const {generateTestData} = require('./generateTestData');
import generateTestData from './generateTestData.js';
// const {Page} = require('./Page');
import Page from './Page.js';
// const {runTest} = require('./runTest');
import runTest from './runTest.js';
// const {
// 	componentSelector,
// 	element,
// 	expectOrdering,
// 	getComponent,
// 	getSubComponent,
// 	getText,
// 	hasClass
// } = require('./selector');
import {
	componentSelector,
	element,
	expectOrdering,
	getComponent,
	getSubComponent,
	getText,
	hasClass
} from './selector.js'
// const {generateDate, urlParamsToObject} = require('./qs');
import {generateDate, urlParamsToObject} from './qs.js';

// module.exports = {
// 	componentSelector,
// 	element,
// 	expectOrdering,
// 	generateDate,
// 	generateTestData,
// 	getComponent,
// 	getSubComponent,
// 	getText,
// 	hasClass,
// 	runTest,
// 	Page,
// 	urlParamsToObject
// };
export {
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
