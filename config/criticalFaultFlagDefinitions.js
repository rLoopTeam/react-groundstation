/*
* Fault flag definitions file.
* Each key should match a flag in the packetDefinitions.js file
*/
module.exports = {
    // Pod Health
    'Pod Health Fault Flags': {
      'smallEndian': true,
      'template': [
        {'name': 'Battery Pack Temperature Range', 'severity': 'critical'},
        {'name': 'Battery Cell Temperature Range', 'severity': 'critical'},
        {'name': 'Battery Voltage Range', 'severity': 'critical'},
        {'name': 'Battery Cell Voltage Range', 'severity': 'critical'},
        {'name': 'Battery Current Range', 'severity': 'critical'},
        {'name': 'HE Temp Range', 'severity': 'critical'},
        {'name': 'HE Current Range', 'severity': 'critical'},
        {'name': 'HE Voltage Range', 'severity': 'critical'},
        {'name': 'HE RPMs Range', 'severity': 'critical'},
        {'name': 'PV Pressure Range', 'severity': 'critical'},
        {'name': 'PV Temperature Range', 'severity': 'critical'}
      ]
    },
    // Power Nodes
    'Power A BMS Faults': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Guarding Fault', 'severity': 'critical'}
      ]
    },
    'Power A BMS Device Faults 1': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Undervoltage Fault', 'severity': 'critical'},
        {'name': 'Overvoltage Fault', 'severity': 'critical'},
        {'name': 'No voltage updates', 'severity': 'critical'}
      ]
    },
    'Power A BMS Device Faults 2': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Undervoltage Fault', 'severity': 'critical'},
        {'name': 'Overvoltage Fault', 'severity': 'critical'},
        {'name': 'No voltage updates', 'severity': 'critical'}
      ]
    },
    'Power A BMS Device Faults 3': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Undervoltage Fault', 'severity': 'critical'},
        {'name': 'Overvoltage Fault', 'severity': 'critical'},
        {'name': 'No voltage updates', 'severity': 'critical'}
      ]
    },
    'Power B BMS Faults': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Guarding Fault', 'severity': 'critical'}
      ]
    },
    'Power B BMS Device Faults 1': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Undervoltage Fault', 'severity': 'critical'},
        {'name': 'Overvoltage Fault', 'severity': 'critical'},
        {'name': 'No voltage updates', 'severity': 'critical'}
      ]
    },
    'Power B BMS Device Faults 2': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Undervoltage Fault', 'severity': 'critical'},
        {'name': 'Overvoltage Fault', 'severity': 'critical'},
        {'name': 'No voltage updates', 'severity': 'critical'}
      ]
    },
    'Power B BMS Device Faults 3': {
      'smallEndian': true,
      'template': [
        {'name': 'General Fault', 'severity': 'critical'},
        {'name': 'Undervoltage Fault', 'severity': 'critical'},
        {'name': 'Overvoltage Fault', 'severity': 'critical'},
        {'name': 'No voltage updates', 'severity': 'critical'}
      ]
    }
  };
  