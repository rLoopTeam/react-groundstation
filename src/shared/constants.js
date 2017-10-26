export const STATEMACHINE_STATES = {
  UNKNOWN_STATE: '?',
  NO_COMMAND: 0,
  INIT: 1,
  IDLE: 2,
  TEST_MODE: 3,
  DRIVE: 4,
  ARMED_WAIT: 5,
  FLIGHT_PREP: 6,
  READY: 7,
  ACCEL: 8,
  COAST_INTERLOCK: 9,
  BRAKE: 10,
  SPINDOWN: 11
};

export const STATEMACHINE_STATES_INT_INDEXED = {
  '?': 'UNKNOWN_STATE',
  0: 'NO_COMMAND',
  1: 'INIT',
  2: 'IDLE',
  3: 'TEST_MODE',
  4: 'DRIVE',
  5: 'ARMED_WAIT',
  6: 'FLIGHT_PREP',
  7: 'READY',
  8: 'ACCEL',
  9: 'COAST_INTERLOCK',
  10: 'BRAKE',
  11: 'SPINDOWN'
};

export const STATEMACHINE_COMMANDS = [
  'NO_COMMAND',
  'IDLE',
  'TEST_MODE',
  'DRIVE',
  'FLIGHT_PREP',
  'READY'
];

export const STATEMACHINE_TRANSITIONS = {
  'IDLE': [
    'TEST_MODE',
    'DRIVE',
    'FLIGHT_PREP'
  ],
  'TEST_MODE': [
    'IDLE'
  ],
  'DRIVE': [
    'IDLE'
  ],
  'FLIGHT_PREP': [
    'READY',
    'IDLE'
  ],
  'READY': [
    'FLIGHT_PREP'
  ]
};
