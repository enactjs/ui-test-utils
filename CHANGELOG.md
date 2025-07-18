# Change Log

## [unreleased]

* Migrated to ESM

## [2.0.1] (July 18, 2025)

* Updated dependencies.

## [2.0.0] (June 10, 2025)

* Updated dependencies.

## [2.0.0-rc.1] (May 15, 2025)

* Fixed ui-tests errorShot saving failure by adding `await` to `browser.saveScreenshot()`.
* Fixed ss-tests number of running instances on tv board by fixing maxInstances config property name.
* Removed eslint-related configs in `package.json`.

## [2.0.0-alpha.2] (March 7, 2025)

* Updated `webdriverio` and related dependencies to version 9.
* Dropped support for Node.js 16. Required Node.js version >= 18.
* Removed deprecated `@wdio/selenium-standalone-service` module and added `wdio-selenium-standalone-service` community package.
* Removed `w3c: false` and replaced with `'wdio:enforceWebDriverClassic': true` when running tests on a remote debugger. w3c enforces the usage of JSON Wire Protocol which has been removed from `webdriverio` v9.
* Replaced deprecated dependency `wdio-image-comparison-service` with `@wdio/visual-service`.

## [2.0.0-alpha.1] (February 26, 2025)

* Updated `eslint` to v9 and adopted flat config.
* Added `--no-animation` option for screenshot test.

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
