import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductPage } from '../src/ProductPage.jsx';
import { buildProduct } from '../src/factories.js';

// example:bad
// Problem: pins the banner's exact markup. Any change to that markup
// fails the test, and nobody reads the diff before pressing "update".
describe('<ProductPage />', () => {
  it('shows the guest banner', () => {
    render(<ProductPage product={buildProduct({ name: 'Wireless Headphones', priceCents: 19900 })} />);
    expect(screen.getByRole('status')).toMatchInlineSnapshot(`
      <p
        class="guest-banner"
        role="status"
      >
        Browsing as a guest. 
        <a
          href="/sign-in"
        >
          Sign in
        </a>
         to save your cart.
      </p>
    `);
  });
});
// example:end

// example:good
describe('<ProductPage />', () => {
  it('shows the product name and price', () => {
    render(<ProductPage product={buildProduct({ name: 'Wireless Headphones', priceCents: 19900 })} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wireless Headphones');
    expect(screen.getByText('$199.00')).toBeInTheDocument();
  });
});
// example:end
