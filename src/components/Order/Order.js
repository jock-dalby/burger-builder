import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingredients = Object.keys(props.ingredients).map(key => (
    {name: key, amount: props.ingredients[key]}
  ));

  const ingredientOuput = ingredients.map(ingredient => (
    <span style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOuput}</p>
      <p>Price: <strong>${Number(props.price).toFixed(2)}</strong></p>
    </div>
  )
}

export default order;