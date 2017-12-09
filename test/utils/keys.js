function keyDelay (key, delay = 50) {
	browser.keys(key);
	browser.pause(delay);

	return browser;
}

function keyRepeat (key, count = 1, delay) {
	while (count--) {
		keyDelay(key, delay);
	}

	return browser;
}

module.exports = {
	keyDelay,
	keyRepeat
};
