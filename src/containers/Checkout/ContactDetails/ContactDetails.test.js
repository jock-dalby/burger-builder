import React from 'react';
import ReactDOM from 'react-dom';
import ContactDetails from './ContactDetails';

let container;
let orderHandler;

beforeEach(() => {
  orderHandler = jest.fn();
  container = document.createElement('div');
  ReactDOM.render(<ContactDetails onSubmit={orderHandler}/>, container);
})

test('component exists', () => {
  expect(container).toBeTruthy();
});

test('header exists', () => {
  const header = container.querySelector('h4');
  expect(header.textContent).toBe('Enter your contact details');
});

test('form exists', () => {
  const form = container.querySelector('form');
  expect(form).toBeTruthy();
});

test('calls orderHandler when form is submitted', () => {
  const form = container.querySelector('form');

  const name = form.elements[0];
  const email = form.elements[1];
  const button = form.elements[3];

  name.value = 'Jock'
  email.value = 'Jock@gmail.com';

  button.click();
  form.dispatchEvent(new window.Event('submit'));

  expect(orderHandler).toHaveBeenCalled();

})
