---
layout: recommendation
title: "Create only the data you need"
---
Build the data each test needs inside that test, using small factories that
take overrides. A broad `beforeEach` that signs in a user and seeds reviews
makes every test depend on all of it, slows the suite, and leaves no room for
the empty or guest states. If several tests share identical setup, nest them
in a describe block and scope the hook there.

### Bad
{: .spec-wrong}

<!-- example:bad rules/07-create-only-the-data-you-need.test.jsx -->
```jsx
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
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(product.name);
  });

  it('lists the reviews', () => {
    render(<ProductPage product={product} user={user} reviews={reviews} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/07-create-only-the-data-you-need.test.jsx -->
```jsx
describe('<ProductPage />', () => {
  it('shows the product name', () => {
    render(<ProductPage product={buildProduct({ name: 'Wireless Headphones' })} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wireless Headphones');
  });

  it('says when there are no reviews', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
  });

  it('lists the reviews', () => {
    const reviews = [buildReview({ body: 'Great sound.' }), buildReview({ body: 'Too heavy.' })];
    render(<ProductPage product={buildProduct()} reviews={reviews} />);
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'Great sound.',
      'Too heavy.',
    ]);
  });
});
```
<!-- /example -->
