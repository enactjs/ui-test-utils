# Utilities for Automated UI Testing of Enact components

This package includes the common WebDriver configurations and some utility modules for executing
automated UI tests from Enact UI library packages. This package is not intended to be used directly
and must be configured as a `devDependency` of the UI library.

## Setting up a UI Library

1. Add `@enact/ui-test-utils` as a devDependency: `npm i --save-dev @enact/ui-test-utils`
2. Create the `tests/ui` folder structure within the UI library
3. Add `apps` and `specs` folders to `tests/ui`
4. Add local WebDriver configuration files within `tests/ui`

    * `wdio.conf.js` containing `module.exports = require('@enact/ui-test-utils/ui/wdio.conf.js');`
    * `wdio.docker.conf.js` containing `module.exports = require('@enact/ui-test-utils/ui/wdio.docker.conf.js');`
    * `wdio.tv.conf.js` containing `module.exports = require('@enact/ui-test-utils/ui/wdio.tv.conf.js');`

and `tests/screenshot`

    * `wdio.conf.js` containing `module.exports = require('@enact/ui-test-utils/screenshot/wdio.conf.js');`
    * `wdio.docker.conf.js` containing `module.exports = require('@enact/ui-test-utils/screenshot/wdio.docker.conf.js');`
    * `wdio.tv.conf.js` containing `module.exports = require('@enact/ui-test-utils/screenshot/wdio.tv.conf.js');`

5. Add npm scripts for each of the above configuration files. There are likely other scripts already
   defined so these will be added to the existing scripts.

```json
   "scripts": {
      "test-ui": "start-tests tests/ui/wdio.conf.js",
      "test-ui-docker": "start-tests tests/ui/wdio.docker.conf.js",
      "test-ui-tv": "start-tests tests/ui/wdio.tv.conf.js",
      "test-ss": "start-tests tests/screenshot/wdio.conf.js",
      "test-ss-docker": "start-tests tests/screenshot/wdio.docker.conf.js",
      "test-ss-tv": "start-tests tests/screenshot/wdio.tv.conf.js",
   }
```

6. Optionally configure different ESLint and git configuration rules using `.eslintrc.js` and
   `.gitignore` files, respectively

## Creating tests

Within the UI Library, create an app for testing in **`/tests/ui/apps`** and create a corresponding test in **`/tests/ui/specs`**.

The `Page` component from `@enact/ui-test-utils/test/Page` contains useful methods for loading tests.

## Testing on TV

Pass the IP address of the TV as an environment variable and use the `test-ui-tv` task:

```bash
TV_IP=10.0.1.1 npm run test-ui-tv
```

## Filtering Tests

### Filtering UI by Component

```bash
npm run test-ui -- --spec <pattern>
```

Example 1 -  will execute tests for 'ExpandableInput'

```bash
npm run test-ui -- --spec ExpandableInput
```

Example 2 - will execute tests for 'Input' component

```bash
npm run test-ui -- --spec /Input
```

Note: `<pattern>` can also be a regex and may need to be in quotes to prevent expansion on the command
line.

### Filtering Screenshot by Component

```bash
npm run test-ss -- --component <pattern>
```

Note: `pattern` may need to be in quotes to prevent expansion on the command line if you use a regex.

Example 1 - uses regular expression to match only tests that begin with 'Button'

```bash
npm run test-ss -- --component "^Button"
```

Example 2 - match all tests that contain 'Button'

```bash
npm run test-ss -- --component Button
```

### Filtering Screenshot by Theme

```bash
npm run test-ss -- --spec MoonstoneLight-specs
```

You can combine theme and component filtering for more precise runs:

```bash
npm run test-ss -- --component CheckboxItem --spec Moonstone-specs
```

### Filtering Screenshot by Title

Search within the title of the screenshot for a specific regex string:

```bash
npm run test-ss -- --title "color = green"
```

As before, you can combine multiple filters:

```bash
npm run test-ss -- --component "^Button" --title "disabled"
```

### Filtering Screenshot by Test ID

Execute the first test of each component:

```bash
npm run test-ss -- --id 0
```

The test ID can be gotten from the failed tests results, looking at the request output or by counting the number of tests in a component.

As before, you can combine multiple filters:

```bash
npm run test-ss -- --component "^Button" --id 10
```

## Failed UI Test Screenshots

When a test fails, a screenshot will be captured showing the state when it failed. The screenshots
are saved to **`./tests/ui/errorShots/`**. The test run will display the filename for a failed test:

Example:

```none
F
	Screenshot location: ./tests/ui/errorShots/should-meet-initial-conditions.png
```

## Viewing Test Results

After a test runs, if new screenshots are generated, a page is created with links to open each of the images. To open this file (on a Mac):

```bash
open tests/screenshot/dist/newFiles.html
```

If there are test failures, a failure log is created that contains links to the sets of images. To open this file (on a Mac):

```bash
open tests/screenshot/dist/failedTests.html
```

Images can be navigated using the keyboard arrow keys. Click on an image to zoom in.  Click out of the image to zoom out.

In the output, the **test case** button opens the sample app with the parameters that produced the output. This requires that a server be running on port 5000. If you have globally installed the `serve` command with `npm install -g serve` you can start the server like this:

```bash
serve tests/screenshot/dist
```

## Optimizing Building

### Re-run tests without building

The `--skip-build` option can be used to skip packing Enact and the `apps` directory.  Changes to
the Enact version or test apps will not be picked up.

```bash
npm run test-ui -- --spec /Input --skip-build
```

### Re-pack the apps without running the tests

To re-pack just the tests, without rebuilding Enact or running the tests, use `--pack-tests`. This
is primarily useful when using `serve dist` (See **Loading sample apps in a browser** below) to view
test apps in the browser.

```bash
npm run test-ui -- --pack-tests
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

### Viewing screenshot tests in the browser

Navigate to a URL using the component name and test case number. Change 'Moonstone-View' to the name of the view appropriate for your library.

```none
localhost:5000/Moonstone-View/?component=<component name>&testId=<number of the test>
```

Example:

```none
localhost:5000/Moonstone-View/?component=RadioItem&testId=10
```
