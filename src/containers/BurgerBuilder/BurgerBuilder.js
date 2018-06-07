import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    // local UI state
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://burger-builder-73216.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(err => this.setState({ error: true }));
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[ key ])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchaseable: sum > 0
    })
  }

  addIngredientHandler = (type) => {
    this.props.addIngredientHandler(type)
    // const updatedIngredients = {
    //   ...this.state.ingredients
    // }
    // updatedIngredients[ type ] = updatedIngredients[ type ] + 1;
    // const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[ type ];
    // this.setState({
    //   ingredients: updatedIngredients,
    //   totalPrice: updatedPrice
    // })
    // this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[ type ] <= 0) {
      return
    }
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[ type ] = updatedIngredients[ type ] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[ type ];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  cancelPurchaseHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  continuePurchaseHandler = () => {
    const queryParams = Object.keys(this.state.ingredients).map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(this.state.ingredients[key])
    );
    queryParams.push(`totalPrice=${this.state.totalPrice}`);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {

    let disabledInfo = {};
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ingredients) {

      Object.keys(this.props.ingredients).forEach(ingredient => {
        disabledInfo[ ingredient ] = this.props.ingredients[ ingredient ] <= 0;
      });

      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls ingredients={this.props.ingredients}
            addIngredient={type => this.props.onIngredientAdded(type)}
            removeIngredient={type => this.props.onIngredientRemoved(type)}
            disabledInfo={disabledInfo}
            purchaseable={this.state.purchaseable}
            totalPrice={this.props.totalPrice}
            purchase={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = <OrderSummary ingredients={this.props.ingredients}
        totalPrice={this.props.totalPrice}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchaseHandler={this.continuePurchaseHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    };

    return (
      <Aux>
        <Modal show={this.state.purchasing}
          onClicked={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredientName } }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredientName }}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));