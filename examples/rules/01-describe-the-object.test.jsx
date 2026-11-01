import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { transformData } from '../src/transformData.js';
import { SignUpForm } from '../src/SignUpForm.jsx';

// example:bad
// Problem: prose titles drift from the code and are hard to grep for.
describe('a function to transform data', () => {
  it('drops rows without an id', () => {
    expect(transformData([{ display_name: 'No id', price_cents: 100 }])).toEqual([]);
  });
});

describe('the sign up form component', () => {
  it('asks for an email', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
  });
});
// example:end

// example:good
describe('transformData()', () => {
  it('drops rows without an id', () => {
    expect(transformData([{ display_name: 'No id', price_cents: 100 }])).toEqual([]);
  });
});

describe('<SignUpForm />', () => {
  it('asks for an email', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
  });
});
// example:end
