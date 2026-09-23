import {createRoot} from 'react-dom/client';
import TestChooser from './TestChooser.js';

// ESM static imports are hoisted and evaluated first. Keep a boot marker and
// load the app via eager import() so a thrown UI_TEST_APP_ENTRY can be reported.
window.__TEST_BOOT = true;
window.addEventListener('error', function (event) {
	if (!window.__TEST_LOAD_ERROR) {
		window.__TEST_LOAD_ERROR = String((event && (event.message || event.error)) || 'window error');
	}
});

function applyEntry (entry) {
	const App = entry.default;
	const testMetadata = entry.testMetadata || (App && App.testMetadata);

	const url = new URL(window.location.href);

	const props = ['locale', 'request', 'component', 'testId'].reduce((obj, param) => {
		const value = url.searchParams.get(param);
		if (value != null) {
			obj[param] = value;
		}

		return obj;
	}, {});

	if ('testId' in props) props.testId = Number.parseInt(props.testId);

	if (!testMetadata) {
		window.__TEST_LOAD_ERROR = 'UI_TEST_APP_ENTRY missing testMetadata (exports: ' + Object.keys(entry).join(', ') + ')';
	}

	if ('request' in props) {
		window.__TEST_DATA = testMetadata;
	} else if (Object.keys(props).length) {
		createRoot(document.getElementById('root'))
			.render(<App {...props} />);
	} else {
		createRoot(document.getElementById('root'))
			.render(<TestChooser metadata={testMetadata} />);
	}
}

import(/* webpackMode: "eager" */ 'UI_TEST_APP_ENTRY').then(applyEntry).catch(function (err) {
	window.__TEST_LOAD_ERROR = String((err && (err.stack || err.message)) || err);
});
