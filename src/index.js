import 'core-js/stable';
import React from 'react';
import {render} from 'react-dom';
import App, {testMetadata} from 'UI_TEST_APP_ENTRY';

const url = new URL(window.location.href);

const props = ['locale', 'request', 'component', 'testId'].reduce((obj, param) => {
	const value = url.searchParams.get(param);
	if (value != null) {
		obj[param] = value;
	}

	return obj;
}, {});

if ('testId' in props) props.testId = Number.parseInt(props.testId);

if ('request' in props) {
	window.__TEST_DATA = testMetadata;
} else {
	render(
		<App {...props} />,
		document.getElementById('root')
	);
}
