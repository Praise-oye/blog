import React from 'react';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from 'react-dom';
import Contact from '../components/contact/Contact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Contact />, div);
  unmountComponentAtNode(div);
});
