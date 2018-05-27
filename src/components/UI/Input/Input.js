import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];

  if(props.invalid === true && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch(props.inputtype) {
    case('input'):
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChangeHandler}/>;
      break;
    case('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChangeHandler}/>;
      break;
    case('select'):
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value} onChange={props.onChangeHandler}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>{option.name}</option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.onChangeHandler}/>;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input;