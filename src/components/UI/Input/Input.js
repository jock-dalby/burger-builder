import React from 'react';
import classes from './Input.css';

const input = (props) => {
  // classes
  const inputClasses = [classes.inputElement];
  if(props.invalid === true && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  let inputElement = null;
  // InputElement
  switch(props.inputtype) {
    case('input'):
      inputElement = <input className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onBlur={props.onBlurHandler}
        onChange={props.onChangeHandler}/>;
      break;
    case('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onBlur={props.onBlurHandler}
        onChange={props.onChangeHandler}/>;
      break;
    case('select'):
      inputElement = (
        <select className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.onChangeHandler}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.name}</option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onBlur={props.onBlurHandler}
        onChange={props.onChangeHandler}/>;
  }
  // ValidationError
  let validationError = null;
  if (props.invalid && props.touched) {
      validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}!</p>;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
}

export default input;