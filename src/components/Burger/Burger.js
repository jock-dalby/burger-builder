import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  const transformedIngredients = Object.keys(props.ingredients)
    .map(key => {
      return [...Array(props.ingredients[key])] // create an empty array to map over, returns [ , ]
      // use the index to create a unique key for each ingredient.
        .map((_, i) => <BurgerIngredient key={key + i} type={key}/>)
    }).reduce((arr, elem) => {
      return arr.concat(elem);
    }, []);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients.length > 0 ? transformedIngredients : 'Start adding ingredients'}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
}

export default burger;