import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import $ from 'jquery';


import Throttles from '../../../src/components/Throttles';

describe("Render Suite", function() {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Throttles />, 
        div
      );
  });
})

describe("Hover Command Suite", function () { 
  it('number of Hover inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverInputs = throttles.find('[name="Hover"]');

     expect(hoverInputs.length).toEqual(2);
  })

  it('Hover input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverInputsValues = throttles.find('[name="Hover"]').map(function (item, index) { 
       return item.props().value;
    });

     expect(hoverInputsValues).toEqual(["true", "false"]);
  })
})

describe("Hover Static Command Suite", function () { 
  it('number of Hover Static inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverStaticInputs = throttles.find('[name="StaticHovering"]');

     expect(hoverStaticInputs.length).toEqual(2);
  })

  it('Hover Static input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverStaticInputsValues = throttles.find('[name="StaticHovering"]').map(function (item, index) { 
       return item.props().value;
    });

     expect(hoverStaticInputsValues).toEqual(["true", "false"]);
  })
})

describe("Cooling Command Suite", function () { 
  it('number of total Front Left Cooling inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputs = throttles.find('[name="CoolingFL"]');

     expect(coolingFLInputs.length).toEqual(2);
  }) 

  it('number of total Front Right Cooling inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputs = throttles.find('[name="CoolingFR"]');

     expect(coolingFRInputs.length).toEqual(2);
  })
  
  it('number of total Rear Left Cooling inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputs = throttles.find('[name="CoolingRL"]');

     expect(coolingRLInputs.length).toEqual(2);
  })
  
  it('number of total Rear Right Cooling inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputs = throttles.find('[name="CoolingRR"]');

     expect(coolingRRInputs.length).toEqual(2);
  })



  it('Front Left Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputsValues = throttles.find('[name="CoolingFL"]').map(function (item, index) { 
       return item.props().value;
    });

     expect(coolingFLInputsValues).toEqual(["true", "false"]);
  })
  
  it('Front Right Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputsValues = throttles.find('[name="CoolingFR"]').map(function (item, index) { 
       return item.props().value;
    });

     expect(coolingFRInputsValues).toEqual(["true", "false"]);
  })
  
  it('Rear Left Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputsValues = throttles.find('[name="CoolingRL"]').map(function (item, index) { 
       return item.props().value;
    });

     expect(coolingRLInputsValues).toEqual(["true", "false"]);
  })
  
  it('Rear Right Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputsValues = throttles.find('[name="CoolingRR"]').map(function (item, index) { 
       return item.props().value;
    });

     expect(coolingRRInputsValues).toEqual(["true", "false"]);
  })
})
