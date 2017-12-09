const {keyDelay} = require('./keys');

function left () {
	return keyDelay('Left arrow');
}

function right () {
	return keyDelay('Right arrow');
}

function up () {
	return keyDelay('Up arrow');
}

function down () {
	return keyDelay('Down arrow');
}

function select () {
	return keyDelay('Enter');
}

function hidePointer () {
	return keyDelay('F1');
}

function showPointer () {
	return keyDelay('F2');
}

module.exports = {
	left,
	right,
	up,
	down,
	select,
	showPointer,
	hidePointer
};
