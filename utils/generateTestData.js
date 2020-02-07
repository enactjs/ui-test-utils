const formatDate = date => {
	// Dates without time made with generateDate will have 00:01:02 for the time
	// TODO: Ability to return times
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const year = '' + date.getFullYear();

	return `${year}-${month}-${day}`;
};

// Replacer function for stringify.  Can be used to process values and convert to more friendly
// values for test titles.
function replacer (key, value) {
	// Detect components as children
	// TODO: Would be nice to get displayName but hard to do
	if (value && value.$$typeof) {
		return {
			props: value.props,
			children: value.children
		};
	} else if (value === '') {
		return '<empty>';
	} else if (key === 'key' || key === 'ref') {
		// eslint-disable-next-line no-undefined
		return undefined;
	} else if (key === 'props' && typeof value === 'object' && Object.keys(value).length === 0) {
		return 'default';
	} else if (this[key] instanceof Date) {	// `this` is instance of object that contains key/value
		return formatDate(this[key]);		// Need to do this because toJson called before replacer
	}
	return value;
}

const stringifyProps = (props = {}) => {
	let outputProps = props;
	if (props.props && props.props.children) {
		// Put `children` first in the title
		const tmp = Object.assign({children: null}, props.props);
		outputProps = Object.assign({}, props);
		outputProps.props = tmp;
	}
	const formattedString = JSON.stringify(outputProps, replacer)
		.replace(/[{}"]/g, '')
		.replace(/:/g, ' = ')
		.replace(/,/g, ', ')
		// TODO: check for complex children and remove
		.replace('props = ', '')
		.replace('wrapper = ', '');

	return formattedString.length === 0 ? 'default' : formattedString;
};

const generateTestData = (component, componentTests) => {
	let metaData = [];
	componentTests.forEach((testCase) => {
		let title = testCase.title;

		if (!title) {
			title = stringifyProps({
				locale: testCase.locale,
				props: testCase.props ? testCase.props : testCase.component.props,
				wrapper: testCase.wrapper,
				textSize: testCase.textSize
			});
		}

		const meta = {
			title
		};
		metaData.push(meta);
	});

	return metaData;
};

module.exports = {
	generateTestData
};
