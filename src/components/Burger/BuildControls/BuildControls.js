import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {Object.keys(props.ingredients).map(
      ingredient => <BuildControl key={ingredient}
        label={jsUcfirst(ingredient)}
        addIngredient={() => props.addIngredient(ingredient)}
        removeIngredient={() => props.removeIngredient(ingredient)}
        disabled={props.disabledInfo[ingredient]}
        />
    )}
  </div>
);

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default buildControls;