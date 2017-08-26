import React from 'react';

const HealthCheckListRow = ({hc, value}) => {
  console.log('VALUE', value);

  return (
    <tr>
      <td key={hc}>{hc}</td>
      <td>{value}</td>
      <td>{value}</td>
    </tr>
  );
};

export default HealthCheckListRow;
