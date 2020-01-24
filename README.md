# Utilities for Automated UI Testing of Enact components

This package includes the common WebDriver configurations and some utility modules for executing
automated UI tests from Enact UI library packages. This package is not intended to be used directly
and must be configured as a `devDependency` of the UI library.

## Setting up a UI Library

1. Add `@enact/ui-test-utils` as a devDependency: `npm i --save-dev @enact/ui-test-utils`
2. Create the `tests/ui` folder struture within the UI library
3. Add `apps` and `specs` folders to `tests/ui`
4. Add local WebDriver configuation files within `tests/ui`

    * `wdio.conf.js` containing `module.exports = require('@enact/ui-test-utils/wdio.conf.js');`
    * `wdio.docker.conf.js` containing `module.exports = require('@enact/ui-test-utils/wdio.docker.conf.js');`
    * `wdio.tv.conf.js` containing `module.exports = require('@enact/ui-test-utils/wdio.tv.conf.js');`

5. Optionally configure different ESLint and git configuration rules using `.eslintrc.js` and
   `.gitignore` files, respectively

## Creating tests

Within the UI Library, create an app for testing in **`/tests/ui/apps`** and create a corresponding test in **`/tests/ui/specs`**.

The `Page` component from `@enact/ui-test-utils/test/Page` contains useful methods for loading tests.

## Testing on TV

Pass the IP address of the TV as an environment variable and use the `test-tv` task:

```bash
TV_IP=10.0.1.1 npm run test-ui-tv
```

## Filtering Tests

### Filtering by Component

```bash
npm test-ui -- --spec <pattern>
```

Example 1 -  will execute tests for 'ExpandableInput'

```bash
npm test-ui -- --spec ExpandableInput
```

Example 2 - will execute tests for 'Input' component

```bash
npm test-ui -- --spec /Input
```

Note: `<pattern>` can also be a regex and may need to be in quotes to prevent expansion on the command
line.

## Failed Test Screenshots

When a test fails, a screenshot will be captured showing the state when it failed. The screenshots
are saved to **`./errorShots/`**. The test run will display the filename for a failed test:

Example:

```none
F
	Screenshot location: ./errorShots/should-meet-initial-conditions.png
```

## Optimizing Building

### Re-run tests without building

The `--skip-build` option can be used to skip packing Enact and the `apps` directory.  Changes to
the Enact version or test apps will not be picked up.

```bash
npm test -- --spec /Input --skip-build
```

### Re-pack the apps without running the tests

To re-pack just the tests, without rebuilding Enact or running the tests, use `--pack-tests`. This
is primarily useful when using `serve dist` (See **Loading sample apps in a browser** below) to view
test apps in the browser.

```bash
npm run pack-tests
```

## Advanced Usage

### Running with visible browser

By default, tests run in 'headless' mode, which hides the browser window used for testing.  You can
watch the tests run by passing `--visible`:

```bash
npm run test-ui -- --visible
```

### Running with visible browser and filtering by component

For example, filtering for the component 'Input'.

```bash
npm run test-ui -- --visible --spec /Input
```

### Loading sample apps in a browser

 This requires that a server be running on port 5000. If you have globally installed the `serve`
 command with `npm install -g serve` you can start the server like this:

```bash
serve dist
```

To open a specific test app, open the URL path for the test.  The path will match the name of the JS
source file for the app.  For example, to open the `VirtualList` test app, navigate to:

```none
http://localhost:5000/VirtualList-View/
```
