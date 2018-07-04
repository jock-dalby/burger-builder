import React from 'react';
// enzyme is what allows us to render the <NavigationItems /> component as a standalone component
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// enzyme is now connected
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // create an instance of the rendered component.
    const wrapper = shallow(<NavigationItems />); //jsx
    // using shallow only renders child component's as placeholders and does not actually render the code from
    // the child components. Essentially rendering the code exactly as we see it in the component template.
    expect(wrapper.find(NavigationItem)).toHaveLength(2); // not jsx
  });

  it('should render three <NavigationItem /> elements if is authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuthenticated='true'/>);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});