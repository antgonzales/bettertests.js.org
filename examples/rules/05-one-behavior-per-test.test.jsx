import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductPage } from '../src/ProductPage.jsx';
import { buildProduct } from '../src/factories.js';

// example:bad
// Problem: three unrelated behaviors in one test. When the price format
// breaks, the failure is reported under "guest" and the cart assertion
// never runs.
describe('<ProductPage />', () => {
  it('shows guests the product and lets them add it to the cart', async () => {
    render(<ProductPage product={buildProduct({ priceCents: 19900 })} />);
    expect(screen.getByRole('status')).toHaveTextContent('Browsing as a guest');
    expect(screen.getByText('$199.00')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();
  });
});
// example:end

// example:good
describe('<ProductPage />', () => {
  it('tells guests they are browsing as a guest', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByRole('status')).toHaveTextContent('Browsing as a guest');
  });

  it('shows the price in dollars', () => {
    render(<ProductPage product={buildProduct({ priceCents: 19900 })} />);
    expect(screen.getByText('$199.00')).toBeInTheDocument();
  });

  it('lets guests add the product to the cart', async () => {
    render(<ProductPage product={buildProduct()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    // Two assertions, one behavior: the button stays usable and the count updates.
    expect(screen.getByRole('button', { name: 'Add to cart' })).toBeEnabled();
    expect(screen.getByText('1 item in cart')).toBeInTheDocument();
  });
});
// example:end
