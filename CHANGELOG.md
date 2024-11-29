# Change Log

## [unreleased]

* Updated Enact ESLint config to `9.1.5` including eslint related modules and set temporary ESLINT_USE_FLAT_CONFIG env variable in `package.json`.

## [1.0.10] (October 31, 2024)

* Updated dependencies.

## [1.0.9] (July 22, 2024)

* Updated Chrome driver url for version 114 or higher.

## [1.0.8] (June 11, 2024)

* Removed `chai` and `dirty-chai` dependencies.

## [1.0.7] (February 21, 2024)

* Removed eslint related modules.

## [1.0.6] (December 22, 2023)

* Updated `chalk` version to `^5.3.0`.

## [1.0.5] (September 22, 2023)

* Updated `eslint-plugin-prettier` version to `^5.0.0`.
* Updated dependencies.

## [1.0.4] (June 20, 2023)

* Updated `fs-extra` version to `^11.1.1`.

## [1.0.3] (April 7, 2023)

* Updated `eslint-plugin-react` version to `^7.32.2`.
* Updated dependencies.

## [1.0.2] (December 22, 2022)

* Fixed the util method `waitTransitionEnd` in `utils/Page` by adding `await` to the callback and async-await for the handler function of ontransitionend event.

## [1.0.1] (October 12, 2022)

* Fixed the first tests in the test suite fail randomly by adding missed `await` in `utils/Page`.
* Fixed the util method `waitTransitionEnd` in `utils/Page` to correctly call `browser.waitUntil()` and to wait for the promise of `browser.execute()` to be resolved.

## [1.0.0] (June 8, 2022)

* Updated test app to use `createRoot` API from React 18.
* Updated the `lockfileVersion` of npm-shrinkwrap file to v2.

## [1.0.0-alpha.1] (April 11, 2022)

* Updated dependencies includes ESLint 8.

## [0.1.1]

* Initial release.
