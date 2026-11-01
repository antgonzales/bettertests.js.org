import { useState } from 'react';
import { formatPrice } from './transformData.js';

/**
 * `user` is null for guests. Guests can still add to cart but are
 * invited to sign in; signed-in users see their name.
 */
export function ProductPage({ product, user = null, reviews = [] }) {
  const [cartCount, setCartCount] = useState(0);

  return (
    <article className="product" data-testid="product-page">
      <h1 className="product__name">{product.name}</h1>
      <p className="product__price">{formatPrice(product.priceCents)}</p>

      {user ? (
        <p role="status">Signed in as {user.name}</p>
      ) : (
        <p role="status" className="guest-banner">
          Browsing as a guest. <a href="/sign-in">Sign in</a> to save your cart.
        </p>
      )}

      <button type="button" onClick={() => setCartCount((n) => n + 1)}>
        Add to cart
      </button>
      <p aria-live="polite">
        {cartCount === 1 ? '1 item in cart' : `${cartCount} items in cart`}
      </p>

      <section aria-labelledby="reviews-heading">
        <h2 id="reviews-heading">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>{review.body}</li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
