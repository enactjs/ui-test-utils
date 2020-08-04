module.exports = {
	globals: {
		'browser': true,
		'expect': true,
		'$': true,
		'$$': true
	},
	env: {
		mocha: true,
		node: true
	},
	extends: 'enact/strict',
	rules: {
		'max-nested-callbacks': 'off',
		'no-console': 'off',
		'react/forbid-foreign-prop-types': 'off' // proptypes not removed in storybook config
	}
};
