# Automated UI Testing for Enact components

Usage: `npm test`

## Creating tests

Create an app for testing in `/apps` and create a corresponding test in `/tests`.

The `Page` component contains useful methods for loading tests

## Testing on TV

Pass the IP address of the TV as an environment variable and use the `test-tv` task:

```bash
TV_IP=10.0.1.1 npm run test-tv
```

## Filtering Tests

### Filtering by Component

```bash
npm test -- --spec <pattern>
```

Note: `pattern` may need to be in quotes to prevent expansion on the command line if you use a regex.

Example 1 - uses regular expression to match only tests that begin with 'Button'

```bash
npm test -- --spec "^Button"
```

Example 2 - match all tests that contain 'Button'

```bash
npm test -- --spec Button
```

## Optimizing Building

### Re-run tests without building

The `--skip-build` option can be used to skip packing Enact and the `apps` directory.  Changes to the Enact version or test cases will not be picked up.

```bash
npm test -- --tests "^Button" --spec Moonstone-specs --skip-build
```

### Re-pack the apps without running the tests

To re-pack just the tests, without rebuilding Enact or running the tests, use `--pack-tests`. This is primarily useful when using `serve dist` (see below) to view test cases in the browser.

```bash
npm run pack-tests
```

## Advanced Usage

### Running with visible browser

By default, tests run in 'headless' mode, which hides the browser window used for testing.  You can watch the tests run by passing `--visible`:

```bash
npm run test -- --visible
```

### Loading sample apps in a browser

 This requires that a server be running on port 5000. If you have globally installed the `serve` command with `npm install -g serve` you can start the server like this:

```bash
serve dist
```

To open a specific test app, open the URL path for the test.  The path will match the name of the JS source file for the app.  For example, to open the `VirtualList` test app, navigate to:

```none
http://localhost:5000/VirtualList-View/
```
