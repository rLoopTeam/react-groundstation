export const STATEMACHINE_STATES = {
  UNKNOWN_STATE: '?',
  NO_COMMAND: 0,
  IDLE: 1,
  TEST_MODE: 2,
  DRIVE: 3,
  ARMED_WAIT: 4,
  FLIGHT_PREP: 5,
  READY: 6,
  ACCEL: 7,
  COAST_INTERLOCK: 8,
  BRAKE: 9,
  SPINDOWN: 10
};

export const STATEMACHINE_STATES_INT_INDEXED = {
  '?': 'UNKNOWN_STATE',
  0: 'NO_COMMAND',
  1: 'IDLE',
  2: 'TEST_MODE',
  3: 'DRIVE',
  4: 'ARMED_WAIT',
  5: 'FLIGHT_PREP',
  6: 'READY',
  7: 'ACCEL',
  8: 'COAST_INTERLOCK',
  9: 'BRAKE',
  10: 'SPINDOWN'
};

export const STATEMACHINE_TRANSITIONS = {
  'IDLE': [
    'TEST_MODE',
    'DRIVE',
    'ARMED_WAIT'
  ],
  'TEST_MODE': [
    'IDLE'
  ],
  'DRIVE': [
    'IDLE'
  ],
  'ARMED_WAIT': [
    'IDLE',
    'FLIGHT_PREP'
  ],
  'FLIGHT_PREP': [
    'ARMED_WAIT',
    'READY'
  ],
  'READY': [
    'FLIGHT_PREP'
  ]
};
