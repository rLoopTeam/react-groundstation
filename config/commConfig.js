module.exports = {
	Appserver: {
		port: 3000,
		ip: '127.0.0.1'
	},
	// Used for testing purposes
	PodRxPort: 9100, // Pod details
	PodRxHost:'127.0.0.1',
	testDataGeneratorTargetHost:'127.0.0.1',
	testDataGeneratorTargetPort:'9900',
	RXServers:[ {'port':9110,'hostIP':'192.168.0.110','hostName':'Power Node A'},
	{'port':9111,'hostIP':'192.168.0.111','hostName':'Power Node B'},
	{'port':9100,'hostIP':'192.168.0.100','hostName':'Flight Control'},
	{'port':9120,'hostIP':'192.168.0.120','hostName':'Landing Gear'},
	{'port':9130,'hostIP':'192.168.0.130','hostName':'Gimbal Control'},
	{'port':9170,'hostIP':'192.168.1.170','hostName':'Xilinx Sim'}
	],
	MirrorLocal:true
}