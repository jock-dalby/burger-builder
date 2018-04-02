import React from 'react';
import Aux from '../../hoc/Aux';

const Layout = (props) => (
  <Aux>
    <div>
      Toolbar, Sidedrawer, Backdrop
    </div>
    <main>
      {props.chidren}
    </main>
  </Aux>
)

export default Layout;