const {execSync} = require('child_process');

// read local version of Google Chrome
module.exports.readChromeVersion = () => {
	let chromeVersionMajorNumber;
	if (!process.env.CHROME_DRIVER) {
		if (process.env.TV_IP && process.argv.find(arg => arg.includes('tv.conf'))) {
			process.env.CHROME_DRIVER = 2.44; // Currently, TV supports 83 and lower, but keep the previous version for safety.
		} else {
			try {
				if (process.platform === 'win32') {
					// Windows
					const chromeVersion = /\d+/.exec(execSync('wmic datafile where "name=\'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\'" get Version /value').toString());
					chromeVersionMajorNumber = (chromeVersion && chromeVersion[0]);
				} else if (process.platform === 'darwin') {
					// Mac
					const chromeVersion = /Chrome (\d+)/.exec(execSync('/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version'));
					chromeVersionMajorNumber = (chromeVersion && chromeVersion[1]);
				} else {
					const chromeVersion = /Chrome (\d+)/.exec(execSync('google-chrome -version'));
					chromeVersionMajorNumber = (chromeVersion && chromeVersion[1]);
				}
				const chromeDriverVersion = execSync('curl https://chromedriver.storage.googleapis.com/LATEST_RELEASE' + (chromeVersionMajorNumber ? ('_' + chromeVersionMajorNumber) : ''));

				if (chromeDriverVersion.includes('Error') || !/\d+.\d+.\d+.\d+/.exec(chromeDriverVersion)) {
					throw new Error();
				} else {
					process.env.CHROME_DRIVER = chromeDriverVersion;
				}
			} catch (error) {
				console.log('ERROR: Cannnot find Chrome driver from Chrome ' + chromeVersionMajorNumber);
				process.env.CHROME_DRIVER = 2.44;
			}
		}

		console.log('Chrome Driver Version : ' + process.env.CHROME_DRIVER);
	}

	return chromeVersionMajorNumber;
};
