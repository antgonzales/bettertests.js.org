import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductPage } from '../src/ProductPage.jsx';
import { transformData } from '../src/transformData.js';
import { buildProduct } from '../src/factories.js';

// example:bad
// Problem: the titles describe how the code works today, so a refactor
// that keeps the behavior forces a rename. "Correctly" says nothing.
describe('<ProductPage />', () => {
  it('renders the guest-banner element when user prop is null', () => {
    render(<ProductPage product={buildProduct()} user={null} />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  });
});

describe('transformData()', () => {
  it('transforms data correctly', () => {
    expect(transformData([{ id: 1, display_name: 'Mug', price_cents: 1250 }])).toEqual([
      { id: 1, name: 'Mug', price: '$12.50' },
    ]);
  });
});
// example:end

// example:good
describe('<ProductPage />', () => {
  it('invites guests to sign in', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  });
});

describe('transformData()', () => {
  it('formats prices in dollars', () => {
    expect(transformData([{ id: 1, display_name: 'Mug', price_cents: 1250 }])).toEqual([
      { id: 1, name: 'Mug', price: '$12.50' },
    ]);
  });
});
// example:end
