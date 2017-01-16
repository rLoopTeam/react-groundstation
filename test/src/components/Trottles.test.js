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

    const group1Inputs = throttles.find('[name="Group1"]');

     expect(group1Inputs.length).toEqual(3);
  }) 

  it('number of total Front Right Cooling inputs === 3', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group2Inputs = throttles.find('[name="Group2"]');

     expect(group2Inputs.length).toEqual(3);
  })
  
  it('number of total Rear Left Cooling inputs === 3', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group3Inputs = throttles.find('[name="Group3"]');

     expect(group3Inputs.length).toEqual(3);
  })
  
  it('number of total Rear Right Cooling inputs === 3', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group4Inputs = throttles.find('[name="Group4"]');

     expect(group4Inputs.length).toEqual(3);
  })


/*
*
* Tests for Cooling input values
*
*/
  it('Front Left Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group1InputsValues = throttles.find('[name="Group1"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group1InputsValues).toEqual(["true", "false", "initiate"]);
  })
  
  it('Front Right Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group2InputsValues = throttles.find('[name="Group2"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group2InputsValues).toEqual(["true", "false", "initiate"]);
  })
  
  it('Rear Left Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group3InputsValues = throttles.find('[name="Group3"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group3InputsValues).toEqual(["true", "false", "initiate"]);
  })
  
  it('Rear Right Cooling input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group4InputsValues = throttles.find('[name="Group4"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group4InputsValues).toEqual(["true", "false", "initiate"]);
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

    const hoverEngine1 = throttles.find('[name="hoverEngineMode1"]');

     expect(hoverEngine1.length).toEqual(2);
  }) 

  it('number of total Hover Engine Name 2 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverEngine2 = throttles.find('[name="hoverEngineMode2"]');

     expect(hoverEngine2.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 3 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverEngine3 = throttles.find('[name="hoverEngineMode3"]');

     expect(hoverEngine3.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 4 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverEngine4 = throttles.find('[name="hoverEngineMode4"]');

     expect(hoverEngine4.length).toEqual(2);
  })

  it('number of total Hover Engine Name 5 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverEngine5 = throttles.find('[name="hoverEngineMode5"]');

     expect(hoverEngine5.length).toEqual(2);
  }) 

  it('number of total Hover Engine Name 6 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverEngine6 = throttles.find('[name="hoverEngineMode6"]');

     expect(hoverEngine6.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 7 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverEngine7 = throttles.find('[name="hoverEngineMode7"]');

     expect(hoverEngine7.length).toEqual(2);
  })
  
  it('number of total Hover Engine Name 8 inputs === 2', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const hoverEngine8 = throttles.find('[name="hoverEngineMode8"]');

     expect(hoverEngine8.length).toEqual(2);
  })




/*
*
* Tests for Cooling input values
*
*/
  it('HoverEngine 1 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group1InputsValues = throttles.find('[name="hoverEngineMode1"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group1InputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 2 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group2InputsValues = throttles.find('[name="hoverEngineMode2"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group2InputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 3 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group3InputsValues = throttles.find('[name="hoverEngineMode3"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group3InputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 4 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group4InputsValues = throttles.find('[name="hoverEngineMode4"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group4InputsValues).toEqual(["true", "false"]);
  })

  it('HoverEngine 5 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group1InputsValues = throttles.find('[name="hoverEngineMode5"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group1InputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 6 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group2InputsValues = throttles.find('[name="hoverEngineMode6"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group2InputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 7 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group3InputsValues = throttles.find('[name="hoverEngineMode7"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group3InputsValues).toEqual(["true", "false"]);
  })
  
  it('HoverEngine 8 input values are boolean', () => {

    //render a Throttle component in the document
    const throttles = shallow(<Throttles />);

    const group4InputsValues = throttles.find('[name="hoverEngineMode8"]').map( (item, index) => { 
       return item.props().value;
    });

     expect(group4InputsValues).toEqual(["true", "false"]);
  })
});