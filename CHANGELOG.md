# Change Log

## [unreleased]

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
