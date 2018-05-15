import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 5.5,
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
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[ type ] = updatedIngredients[ type ] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[ type ];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    })
    this.updatePurchaseState(updatedIngredients);
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

    // this.setState({ loading: true });

    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Jock Dalby',
    //     address: {
    //       street: '30 Smith Street',
    //       postCode: '1234',
    //       country: 'USA'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // axios.post('/orders.json', order)
    //   .then(res => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       loading: false,
    //       purchasing: false
    //     });
    //   });
    this.props.history.push('/checkout');
  }

  render() {

    let disabledInfo = {};
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {

      Object.keys(this.state.ingredients).forEach(ingredient => {
        disabledInfo[ ingredient ] = this.state.ingredients[ ingredient ] <= 0;
      });

      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls ingredients={this.state.ingredients}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchaseable={this.state.purchaseable}
            totalPrice={this.state.totalPrice}
            purchase={this.purchaseHandler}
          />
        </Aux>
      )

      orderSummary = <OrderSummary ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);