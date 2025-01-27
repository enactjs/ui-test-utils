const enactStrict = require('eslint-config-enact/strict');
const globals = require('globals');

const customGlobals = {
	'browser': true,
	'expect': true,
	'$': true,
	'$$': true
};

module.exports = [
	...enactStrict,
	{
		files: ['*/.js', '*/.jsx', '*/.ts', '*/.tsx'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...customGlobals,
				...globals.node,
				...globals.mocha

			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		rules: {
			'max-nested-callbacks': 'off',
			'no-console': 'off',
			'react/forbid-foreign-prop-types': 'off' // proptypes not removed in storybook config
		}
	}
];
