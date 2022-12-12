// const os = require('os');
import os from 'node:os';

function ipAddress () {
	const ifaces = os.networkInterfaces();
	let address = 'localhost';

	Object.keys(ifaces).forEach(function (ifname) {
		let iface = ifaces[ifname][0];

		if (!iface || 'IPv4' !== iface.family || iface.internal !== false) {
			// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
			return;
		}

		address = iface.address;
	});
	return address;
}

// module.exports = ipAddress;
export default ipAddress;
