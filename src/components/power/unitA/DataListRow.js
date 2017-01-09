import React, {PropTypes} from 'react';

const DataListRow = ({tempData}) => {
  console.log("tempDAta", tempData)
  return (
    <tr>
      <td>{tempData.id}</td>
      <td>{tempData.temp}</td>
      <td>{tempData.userField}</td>
      <td>{tempData.resolution}</td>
      <td>{tempData.busID}</td>
    </tr>
  );
};


DataListRow.propTypes = {
  tempData: PropTypes.object.isRequired
};

export default DataListRow;