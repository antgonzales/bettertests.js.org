---
layout: recommendation
title: "One behavior per test"
---
Each test proves one behavior, and its title names that behavior. That is
not a cap of one `expect`: two assertions that together describe one outcome
are fine. The problem is a test that checks the guest banner, the price and
the cart in sequence. The first failure hides the others, and the title can no
longer tell you what broke.

### Bad
{: .spec-wrong}

<!-- example:bad rules/05-one-behavior-per-test.test.jsx -->
```jsx
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
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/05-one-behavior-per-test.test.jsx -->
```jsx
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
```
<!-- /example -->
