# Utilities for Automated UI Testing of Enact components

This package includes the common WebDriver configurations and some utility modules for executing
automated UI tests from Enact UI library packages. This package is not intended to be used directly
and must be configured as a `devDependency` of the UI library.

## Setting up a UI Library

1. Add `@enact/ui-test-utils` as a devDependency: `npm i --save-dev @enact/ui-test-utils`
2. Create the `tests/ui` folder structure within the UI library
3. Add `apps` and `specs` folders to `tests/ui`
4. Add local WebDriver configuration files within `tests/ui/config`

    * `wdio.conf.js` containing `import config from '@enact/ui-test-utils/ui/wdio.conf.js'; export default uiConfig;`
    * `wdio.docker.conf.js` containing `import {uiDockerConfig} from '@enact/ui-test-utils/ui/wdio.docker.conf.js'; export default config;`
    * `wdio.tv.conf.js` containing `import {uiTVConfig} from '@enact/ui-test-utils/ui/wdio.tv.conf.js'; export default config;`

* and `tests/screenshot/config`

    * `wdio.conf.js` containing `import config from '@enact/ui-test-utils/screenshot/wdio.conf.js'; export default ssConfig;`
    * `wdio.docker.conf.js` containing `import {ssDockerConfig} from '@enact/ui-test-utils/screenshot/wdio.docker.conf.js'; export default config;`
    * `wdio.tv.conf.js` containing `import {ssTVConfig} from '@enact/ui-test-utils/screenshot/wdio.tv.conf.js'; export default config;`

5. Add npm scripts for each of the above configuration files. There are likely other scripts already
   defined so these will be added to the existing scripts.

```json
   "scripts": {
      "test-ui": "start-tests tests/ui/config/wdio.conf.js",
      "test-ui-docker": "start-tests tests/ui/config/wdio.docker.conf.js",
      "test-ui-tv": "start-tests tests/ui/config/wdio.tv.conf.js",
      "test-ss": "start-tests tests/screenshot/config/wdio.conf.js",
      "test-ss-docker": "start-tests tests/screenshot/config/wdio.docker.conf.js",
      "test-ss-tv": "start-tests tests/screenshot/config/wdio.tv.conf.js",
   }
```

6. Optionally configure different ESLint and git configuration rules using `eslint.config.js` and
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

Example 1 -  will execute tests for 'Button'

```bash
npm run test-ui -- --spec Button
```

Example 2 - will execute tests for 'InputField' component

```bash
npm run test-ui -- --spec /InputField
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
npm run test-ss -- --spec Light-specs
```

You can combine theme and component filtering for more precise runs:

```bash
npm run test-ss -- --component CheckboxItem --spec Default-specs
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

In the output, the **test case** button opens the sample app with the parameters that produced the output. This requires that a server be running on port 3000. If you have globally installed the `serve` command with `npm install -g serve` you can start the server like this:

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

## Advanced Usage

### Setting the Number of Concurrent Instances

To limit or increase the number of concurrent tests, use the `--instances` option:

```bash
npm run test-ui -- --instances 2
```

### Running Tests Offline

By default, the latest versions of various drivers will be downloaded before starting tests. This
can be skipped when no internet connection is available by specifying the `--offline` option:

```bash
npm run test-ui -- --offline
```

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

### Running without animation effects

The `--no-animation` option is used to pack Enact without animation.
You can use this option to test the apps without animation effects.

```bash
npm run test-ss -- --no-animation
```

### Loading sample apps in a browser

 This requires that a server be running on port 3000. If you have globally installed the `serve`
 command with `npm install -g serve` you can start the server like this:

```bash
serve dist
```

To open a specific test app, open the URL path for the test.  The path will match the name of the JS
source file for the app.  For example, to open the `VirtualList` test app, navigate to:

```none
http://localhost:3000/VirtualList-View/
```

### Viewing screenshot tests in the browser

Navigate to a URL using the component name and test case number. Change 'Sandstone-View' to the name of the view appropriate for your library.

An index page will be served when no component is specified.  Select a test from the list to open it.

```none
localhost:3000/Sandstone-View/
```

You can go directly to a test by specifying the component name and test ID number:

```none
localhost:3000/Sandstone-View/?component=<component name>&testId=<number of the test>
```

Example:

```none
localhost:3000/Sandstone-View/?component=RadioItem&testId=10
```
