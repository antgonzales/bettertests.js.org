import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductPage } from '../src/ProductPage.jsx';
import { buildProduct, buildReview, buildUser } from '../src/factories.js';

// example:bad
// Problem: every test pays for a user and three reviews, and no test can
// cover the guest or "no reviews" states without undoing the setup.
describe('<ProductPage />', () => {
  let product;
  let user;
  let reviews;

  beforeEach(() => {
    product = buildProduct();
    user = buildUser();
    reviews = [buildReview(), buildReview(), buildReview()];
  });

  it('shows the product name', () => {
    render(<ProductPage product={product} user={user} reviews={reviews} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(product.name);
  });

  it('lists the reviews', () => {
    render(<ProductPage product={product} user={user} reviews={reviews} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
// example:end

// example:good
describe('<ProductPage />', () => {
  it('shows the product name', () => {
    render(<ProductPage product={buildProduct({ name: 'Wireless Headphones' })} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Wireless Headphones');
  });

  it('says when there are no reviews', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
  });

  it('lists the reviews', () => {
    const reviews = [
      buildReview({ body: 'Great sound.' }),
      buildReview({ body: 'Too heavy.' }),
    ];
    render(<ProductPage product={buildProduct()} reviews={reviews} />);
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'Great sound.',
      'Too heavy.',
    ]);
  });
});
// example:end
