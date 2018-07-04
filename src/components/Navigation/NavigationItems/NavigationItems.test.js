import React from 'react';
// enzyme is what allows us to render the <NavigationItems /> component as a standalone component
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// enzyme is now connected
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {

  let wrapper;
  const loginNavigationItem = <NavigationItem link='/auth'>Log in</NavigationItem>;
  const logoutNavigationItem = <NavigationItem link='/logout'>Log out</NavigationItem>;

  beforeEach(() => {
    // create an instance of the rendered component.
    // using shallow only renders child component's as placeholders and does not actually render the code from
    // the child components. Essentially rendering the code exactly as we see it in the component template.
    wrapper = shallow(<NavigationItems />); //jsx
    // TO FIND OUT HOW TO RENDER THE FULL COMPONENT TREE SEE ENZYME DOCUMENTATION
  })

  it('should render two <NavigationItem /> elements if is NOT authenticated', () => {
    // FOR MORE UTITLITY FUNCTIONS, HOW TO MOCK SERVIES ETC. SEE JEST DOCUMENTATION
    expect(wrapper.find(NavigationItem)).toHaveLength(2); // not jsx
  });

  it(`should render 'Log out' <NavigationItem /> element if is NOT authenticated`, () => {
    expect(wrapper.contains(loginNavigationItem)).toEqual(true);
    expect(wrapper.contains(logoutNavigationItem)).toEqual(false);
  });

  describe('if user is authenticated', () => {
    beforeEach(() => {
      wrapper.setProps({isAuthenticated: true});
    });

    it('should render three <NavigationItem /> elements if is authenticated', () => {
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it(`should render 'Log out' <NavigationItem /> element if is authenticated`, () => {
      expect(wrapper.contains(loginNavigationItem)).toEqual(false);
      expect(wrapper.contains(logoutNavigationItem)).toEqual(true);
    });
  })

});