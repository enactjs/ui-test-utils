const enactConfig = require('eslint-config-enact/strict');
const globals = require('globals');

module.exports = [
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser,
				...globals.expect,
				...globals.$,
				...globals.$$
			}
		},
		plugins: {
			enactConfig
		},
		rules: {
			'max-nested-callbacks': 'off',
			'no-console': 'off',
			'react/forbid-foreign-prop-types': 'off' // proptypes not removed in storybook config
		}
	}
];
