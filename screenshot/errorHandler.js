// A little utility to catch errors executing the test generation routines

window.addEventListener('error', errorMsg => {
	window.__TEST_DATA = 'Error occurred: ' + errorMsg.message;
	return false;
}, {capture: true});
