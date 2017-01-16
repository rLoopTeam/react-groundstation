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
describe("Hover Hover Engine Mode Suite", () => { 
  
/*
*
* Tests for Cooling input count
*
*/
  it('number of total Hover Engine Name 1 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputs = throttles.find('[name="hoverEngineMode1"]');

     expect(coolingFLInputs.length).toEqual(2);
  }) 

  it('number of total Hover Engine Name 2 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputs = throttles.find('[name="hoverEngineMode2"]');

     expect(coolingFRInputs.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 3 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputs = throttles.find('[name="hoverEngineMode3"]');

     expect(coolingRLInputs.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 4 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputs = throttles.find('[name="hoverEngineMode4"]');

     expect(coolingRRInputs.length).toEqual(2);
  })

  it('number of total Hover Engine Name 5 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputs = throttles.find('[name="hoverEngineMode5"]');

     expect(coolingFLInputs.length).toEqual(2);
  }) 

  it('number of total Hover Engine Name 6 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputs = throttles.find('[name="hoverEngineMode6"]');

     expect(coolingFRInputs.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 7 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputs = throttles.find('[name="hoverEngineMode7"]');

     expect(coolingRLInputs.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 8 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputs = throttles.find('[name="hoverEngineMode8"]');

     expect(coolingRRInputs.length).toEqual(2);
  })




/*
*
* Tests for Cooling input values
*
*/
  it('HoverEngine 1 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputsValues = throttles.find('[name="hoverEngineMode1"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFLInputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 2 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputsValues = throttles.find('[name="hoverEngineMode2"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFRInputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 3 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputsValues = throttles.find('[name="hoverEngineMode3"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRLInputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 4 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputsValues = throttles.find('[name="hoverEngineMode4"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRRInputsValues).toEqual(["true", "false"]);
  })

  it('HoverEngine 5 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFLInputsValues = throttles.find('[name="hoverEngineMode5"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFLInputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 6 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingFRInputsValues = throttles.find('[name="hoverEngineMode6"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingFRInputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 7 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRLInputsValues = throttles.find('[name="hoverEngineMode7"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRLInputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 8 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const coolingRRInputsValues = throttles.find('[name="hoverEngineMode8"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(coolingRRInputsValues).toEqual(["true", "false"]);
  })
});