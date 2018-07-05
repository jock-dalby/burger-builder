import React from 'react';
// enzyme is what allows us to render the <NavigationItems /> component as a standalone component
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// enzyme is now connected
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    // onInitIngredients runs on component did mount so need to pass in a function.
    wrapper = shallow(<BurgerBuilder onInitIngredients = {() => {}}/>);
  })

  it('should render <BuildControls /> when recieving ingredients', () => {
    wrapper.setProps({ ingredients: { salad: 0 }});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })

  it('should NOT render <BuildControls /> when NOT recieving ingredients', () => {
    wrapper.setProps({ ingredients: null});
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  })
})