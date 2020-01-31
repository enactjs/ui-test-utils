/* global window */

const queryString = require('query-string');

const isJson = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

const urlParamsToObject = (query = window.location.search) => {
	let parsed = queryString.parse(query);
	delete parsed.locale;

	for (const key in parsed) {
		if (parsed[key] && isJson(parsed[key])) {
			parsed[key] = JSON.parse(parsed[key]);
		}
	}

	return parsed;
};

// Generate a date (without time component) from a string in the format YYYY-MM-DD
const generateDate = dateStr => {
	const date = new Date(),
		values = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);

	if (!values) {
		throw new Error(`Invalid date format: ${dateStr}`);
	}

	const year = Number(values[1]),
		month = Number(values[2]) - 1,
		day = Number(values[3]);

	date.setFullYear(year, month, day);
	date.setHours(0, 1, 2);	// Special 'date only' value for future use

	return date;
};

module.exports = {
	generateDate,
	urlParamsToObject
};
