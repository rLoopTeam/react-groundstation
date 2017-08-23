module.exports = {
  "Appserver": {
    "port": 3000,
    "ip": "127.0.0.1"
  },
  "PodRxPort": 9100,
  "PodRxHost": "127.0.0.1",
  "testDataGeneratorTargetHost": "127.0.0.1",
  "testDataGeneratorTargetPort": "9900",
  "RXServers": [
    {
      "port": 9110,
      "hostIP": "192.168.0.255",
      "hostName": "Power Node A"
    },
    {
      "port": 9111,
      "hostIP": "192.168.0.255",
      "hostName": "Power Node B"
    },
    {
      "port": 9531,
      "hostIP": "192.168.0.255",
      "hostName": "Flight Control"
    },
    {
      "port": 9548,
      "hostIP": "192.168.0.255",
      "hostName": "Landing Gear"
    },
    {
      "port": 9619,
      "hostIP": "192.168.0.255",
      "hostName": "Gimbal Control"
    },
    {
      "port": 9170,
      "hostIP": "192.168.0.255",
      "hostName": "Xilinx Sim"
    },
    {
      "port": 9608,
      "hostIP": "192.168.1.255",
      "hostName": "HE Thermal Monitor"
    },
    {
      "port": 9531,
      "hostIP": "192.168.0.255",
      "hostName": "ASI Monitor System"
    },
    {
      "port": 9615,
      "hostIP": "192.168.0.255",
      "hostName": "Aux Prop Controller"
    },
    {
      "port": 9631,
      "hostIP": "192.168.0.255",
      "hostName": "Charger"
    },
    {
      "port": 9633,
      "hostIP": "192.168.0.255",
      "hostName": "IPS Charger"
    }
  ],
  "MirrorLocal": true
}