import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { jsUcfirst } from '../../../common/HelperFunctions';

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
    {Object.keys(props.ingredients).map(
      ingredient => <BuildControl key={ingredient}
        label={jsUcfirst(ingredient)}
        addIngredient={() => props.addIngredient(ingredient)}
        removeIngredient={() => props.removeIngredient(ingredient)}
        disabled={props.disabledInfo[ingredient]}
        />
    )}
    <button className={classes.OrderButton}
      onClick={props.purchase}
      disabled={!props.purchaseable}>ORDER NOW</button>
  </div>
);

export default buildControls;