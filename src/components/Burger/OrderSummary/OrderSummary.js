import React from 'react';
import Aux from '../../../hoc/Aux';
import { jsUcfirst } from '../../../common/HelperFunctions';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

  const ingredientSummary = Object.keys(props.ingredients)
                              .map(ingredient => <li key={ingredient}>{jsUcfirst(ingredient)}: {props.ingredients[ingredient]}</li>);
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total price: ${props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger"
        clicked={props.cancelPurchase}>CANCEL</Button>
      <Button btnType="Success"
        clicked={props.continuePurchaseHandler}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary;