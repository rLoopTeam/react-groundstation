/*
* Fault flag definitions file. 
* Each key should match a flag in the packetDefinitions.js file
*/
module.exports = {
	// Accel Cal Full
	// e.g. 0x00000007 = 00000000 00000000 00000000 00000111
	// is represented by the following definition:
	"Accel 0 Flags": {
		"smallEndian": true,
		"template": [
			{"name":"Fault 1 (this one is just a warning)", "severity":"warning"}, // 1
			{"name":"Fault 2 (this one is dangerous)", "severity":"danger"}, // 1
			{"name":"Fault 3 (this one is critical!)", "severity":"critical"}, // 1
			// ... 0
			// ... 0
			// ... and so on for the rest of the bits
		]
	},
	"Accel 1 Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General fault", "severity":"warning"},
			{"name":"Dangerous fault", "severity":"danger"},
			{"name":"Critical fault!", "severity":"critical"},
		]
	},

	// Accel Data Full
	"Accel 0 Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General fault", "severity":"warning"},
			{"name":"Dangerous fault", "severity":"danger"},
			{"name":"Critical fault!", "severity":"critical"},
		]
	},
	"Accel 1 Flags": {
		"smallEndian": true,
		"template": [
			{"name":"General fault", "severity":"warning"},
			{"name":"Dangerous fault", "severity":"danger"},
			{"name":"Critical fault!", "severity":"critical"},
		]
	},

	// Brake data
	"Brake Fault flags 1": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"Brake Fault flags 2": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},

	// Laser Opto Sensor"
	"LaserOpto Fault flags": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 1": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 2": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 3": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 4": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 5": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 6": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 7": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserOpto Fault flags 8": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},

	// Forward Laser Distance Sensor
	"ForwardLaser Fault flags": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},

	// Flight Control - Laser Contrast 0"
	"LaserContrast0 System Fault Flags": {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	},
	"LaserContrast0 Laser Fault Flags":  {
		"smallEndian": true,
		"template": [
			"General fault"
		]
	}
}