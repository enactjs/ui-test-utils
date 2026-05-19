import enactStrict from 'eslint-config-enact/strict.js';
import globals from 'globals';

const customGlobals = {
	'browser': true,
	'expect': true,
	'$': true,
	'$$': true
};

export default [
	...enactStrict,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.mocha,
				...customGlobals
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
