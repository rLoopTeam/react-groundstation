module.exports = {
	Appserver: {
		port: 3000,
		ip: '127.0.0.1'
	},
	// Used for testing purposes
	PodTxPort:'9100', // Pod details
	PodTxHost:'127.0.0.1',
	PodRxPort:'9100', // Pod details
	PodRxHost:'127.0.0.1',
	RXServers:[ {'port':9900,'hostIP':'192.168.0.110','hostName':'Power Node'} ]
}