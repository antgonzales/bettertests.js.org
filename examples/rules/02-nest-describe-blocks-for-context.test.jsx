import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductPage } from '../src/ProductPage.jsx';
import { buildProduct, buildUser } from '../src/factories.js';

// example:bad
// Problem: every title repeats the same condition, and the condition is
// easy to leave out of one of them.
describe('<ProductPage />', () => {
  it('shows a guest banner when the user is not signed in', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByRole('status')).toHaveTextContent('Browsing as a guest');
  });

  it('links to sign in when the user is not signed in', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/sign-in');
  });

  it('greets the user by name when the user is signed in', () => {
    render(<ProductPage product={buildProduct()} user={buildUser({ name: 'Ada' })} />);
    expect(screen.getByRole('status')).toHaveTextContent('Signed in as Ada');
  });
});
// example:end

// example:good
describe('<ProductPage />', () => {
  describe('when the user is a guest', () => {
    it('shows a guest banner', () => {
      render(<ProductPage product={buildProduct()} />);
      expect(screen.getByRole('status')).toHaveTextContent('Browsing as a guest');
    });

    it('links to sign in', () => {
      render(<ProductPage product={buildProduct()} />);
      expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/sign-in');
    });
  });

  describe('when the user is signed in', () => {
    it('greets the user by name', () => {
      render(<ProductPage product={buildProduct()} user={buildUser({ name: 'Ada' })} />);
      expect(screen.getByRole('status')).toHaveTextContent('Signed in as Ada');
    });
  });
});
// example:end
