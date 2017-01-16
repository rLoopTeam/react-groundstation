import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import $ from 'jquery';


import Throttles from '../../../src/components/Throttles';

describe("Render Suite", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Throttles />, 
        div
      );
  });
})

describe("Hover Command Suite", () => { 
  it('number of Hover inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverInputs = throttles.find('[name="Hover"]');

     expect(hoverInputs.length).toEqual(2);
  })

  it('Hover input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverInputsValues = throttles.find('[name="Hover"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(hoverInputsValues).toEqual(["true", "false"]);
  })
})

describe("Hover Static Command Suite", () => { 
  it('number of Hover Static inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverStaticInputs = throttles.find('[name="StaticHovering"]');

     expect(hoverStaticInputs.length).toEqual(2);
  })

  it('Hover Static input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverStaticInputsValues = throttles.find('[name="StaticHovering"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(hoverStaticInputsValues).toEqual(["true", "false"]);
  })
})

describe("Cooling Command Suite", () => { 

/*
*
* Tests for Cooling input count
*
*/
  it('number of total Front Left Cooling inputs === 3', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputs = throttles.find('[name="CoolingFL"]');

     expect(coolingFLInputs.length).toEqual(3);
  }) 

  it('number of total Front Right Cooling inputs === 3', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputs = throttles.find('[name="CoolingFR"]');

     expect(coolingFRInputs.length).toEqual(3);
  })
  
  it('number of total Rear Left Cooling inputs === 3', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputs = throttles.find('[name="CoolingRL"]');

     expect(coolingRLInputs.length).toEqual(3);
  })
  
  it('number of total Rear Right Cooling inputs === 3', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputs = throttles.find('[name="CoolingRR"]');

     expect(coolingRRInputs.length).toEqual(3);
  })


/*
*
* Tests for Cooling input values
*
*/
  it('Front Left Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputsValues = throttles.find('[name="CoolingFL"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFLInputsValues).toEqual(["true", "false", "initiate"]);
  })
  
  it('Front Right Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputsValues = throttles.find('[name="CoolingFR"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFRInputsValues).toEqual(["true", "false", "initiate"]);
  })
  
  it('Rear Left Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputsValues = throttles.find('[name="CoolingRL"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRLInputsValues).toEqual(["true", "false", "initiate"]);
  })
  
  it('Rear Right Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputsValues = throttles.find('[name="CoolingRR"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRRInputsValues).toEqual(["true", "false", "initiate"]);
  })
})


/*
*
*
*
*/
describe("Hover Hex Mode Suite", () => { 
  
/*
*
* Tests for Cooling input count
*
*/
  it('number of total Hex Name 1 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputs = throttles.find('[name="hexMode1"]');

     expect(coolingFLInputs.length).toEqual(2);
  }) 

  it('number of total Hex Name 2 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputs = throttles.find('[name="hexMode2"]');

     expect(coolingFRInputs.length).toEqual(2);
  })
  
  it('number of total Hex Name 3 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputs = throttles.find('[name="hexMode3"]');

     expect(coolingRLInputs.length).toEqual(2);
  })
  
  it('number of total Hex Name 4 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputs = throttles.find('[name="hexMode4"]');

     expect(coolingRRInputs.length).toEqual(2);
  })

  it('number of total Hex Name 5 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputs = throttles.find('[name="hexMode5"]');

     expect(coolingFLInputs.length).toEqual(2);
  }) 

  it('number of total Hex Name 6 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputs = throttles.find('[name="hexMode6"]');

     expect(coolingFRInputs.length).toEqual(2);
  })
  
  it('number of total Hex Name 7 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputs = throttles.find('[name="hexMode7"]');

     expect(coolingRLInputs.length).toEqual(2);
  })
  
  it('number of total Hex Name 8 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputs = throttles.find('[name="hexMode8"]');

     expect(coolingRRInputs.length).toEqual(2);
  })




/*
*
* Tests for Cooling input values
*
*/
  it('Hex 1 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputsValues = throttles.find('[name="hexMode1"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFLInputsValues).toEqual(["true", "false"]);
  })
  
  it('Hex 2 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputsValues = throttles.find('[name="hexMode2"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFRInputsValues).toEqual(["true", "false"]);
  })
  
  it('Hex 3 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputsValues = throttles.find('[name="hexMode3"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRLInputsValues).toEqual(["true", "false"]);
  })
  
  it('Hex 4 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputsValues = throttles.find('[name="hexMode4"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRRInputsValues).toEqual(["true", "false"]);
  })

  it('Hex 5 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputsValues = throttles.find('[name="hexMode5"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFLInputsValues).toEqual(["true", "false"]);
  })
  
  it('Hex 6 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputsValues = throttles.find('[name="hexMode6"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFRInputsValues).toEqual(["true", "false"]);
  })
  
  it('Hex 7 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputsValues = throttles.find('[name="hexMode7"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRLInputsValues).toEqual(["true", "false"]);
  })
  
  it('Hex 8 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputsValues = throttles.find('[name="hexMode8"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRRInputsValues).toEqual(["true", "false"]);
  })
});