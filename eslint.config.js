const enactPlugin = require('eslint-plugin-enact');
const globals = require('globals');

module.exports = [{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.expect,
				...globals.$,
				...globals.$$
			}
		},
		plugins: {
			enactPlugin
		},
		rules: {
			'max-nested-callbacks': 'off',
			'no-console': 'off',
			'react/forbid-foreign-prop-types': 'off' // proptypes not removed in storybook config
		}
	}
];
