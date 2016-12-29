var winston = require('winston');

module.exports = function ()
{

	var logger = new (winston.Logger)({
		transports: [
			new (winston.transports.File)({ filename: 'winston_rx.log' }),
			new (winston.transports.File)({ filename: 'winston_all.log', name: 'file.all' })
		]
	});

	logger.level = 'debug';
	
	return logger;
};