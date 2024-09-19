// const {generateTestData} = require('./generateTestData');
// const {Page} = require('./Page');
// const {runTest} = require('./runTest');
// const {
// 	componentSelector,
// 	element,
// 	expectOrdering,
// 	getComponent,
// 	getSubComponent,
// 	getText,
// 	hasClass
// } = require('./selector');
// const {generateDate, urlParamsToObject} = require('./qs');
//
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

import {generateTestData} from './generateTestData.js';
import {Page} from './Page.js';
import {runTest} from './runTest.js';
import {
	componentSelector,
	element,
	expectOrdering,
	getComponent,
	getSubComponent,
	getText,
	hasClass
} from './selector.js';
import {generateDate, urlParamsToObject} from './qs.js';

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
