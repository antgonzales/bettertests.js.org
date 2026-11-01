import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductPage } from '../src/ProductPage.jsx';
import { buildProduct } from '../src/factories.js';

// example:bad
// Problem: asserts on class names and element order. Renaming a class or
// moving the price fails the test while the page still looks right.
describe('<ProductPage />', () => {
  it('shows the price', () => {
    const { container } = render(<ProductPage product={buildProduct({ priceCents: 19900 })} />);
    const price = container.querySelector('.product__price');
    expect(price).not.toBeNull();
    expect(price.textContent).toBe('$199.00');
    expect(container.firstChild.children[1]).toBe(price);
  });

  it('marks guests', () => {
    const { container } = render(<ProductPage product={buildProduct()} />);
    expect(container.querySelector('.guest-banner')).not.toBeNull();
  });
});
// example:end

// example:good
describe('<ProductPage />', () => {
  it('shows the price', () => {
    render(<ProductPage product={buildProduct({ priceCents: 19900 })} />);
    expect(screen.getByText('$199.00')).toBeVisible();
  });

  it('tells guests they are browsing as a guest', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByRole('status')).toHaveTextContent('Browsing as a guest');
  });
});
// example:end
