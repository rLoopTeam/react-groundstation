import React from 'react';

const HealthCheckHeaderRow = ({hc}) => {
  return (
      <th key={hc}>{hc}</th>
  );
};

export default HealthCheckHeaderRow;
