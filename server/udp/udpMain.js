const udptx = require('./tx');
const udprx = require('./rx');

module.exports = function ()
{

	var udp = {
	  tx: udptx,
	  rx: udprx
	}

	return udp;
};