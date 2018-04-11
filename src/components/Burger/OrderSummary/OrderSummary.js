import React from 'react';
import Aux from '../../../hoc/Aux';
import { jsUcfirst } from '../../../common/HelperFunctions';

const orderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
                              .map(ingredient => <li key={ingredient}>{jsUcfirst(ingredient)}: {props.ingredients[ingredient]}</li>);
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continure to checkout?</p>
    </Aux>
  )
}

export default orderSummary;