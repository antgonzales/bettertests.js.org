import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductPage } from '../src/ProductPage.jsx';
import { buildProduct } from '../src/factories.js';

// example:bad
// Problem: "should" adds a word to every title and no information.
describe('<ProductPage />', () => {
  it('should show the price', () => {
    render(<ProductPage product={buildProduct({ priceCents: 19900 })} />);
    expect(screen.getByText('$199.00')).toBeInTheDocument();
  });

  it('should add the product to the cart', async () => {
    render(<ProductPage product={buildProduct()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();
  });
});
// example:end

// example:good
describe('<ProductPage />', () => {
  it('shows the price', () => {
    render(<ProductPage product={buildProduct({ priceCents: 19900 })} />);
    expect(screen.getByText('$199.00')).toBeInTheDocument();
  });

  it('adds the product to the cart', async () => {
    render(<ProductPage product={buildProduct()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();
  });
});
// example:end
