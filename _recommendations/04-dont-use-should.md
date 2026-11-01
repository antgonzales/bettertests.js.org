---
layout: recommendation
title: "Don't use \"should\""
---
Every title that starts with "should" spends its first word on nothing. Write
the behavior in the present tense as a fact about the subject: "shows the
price", "adds the product to the cart". The output reads as a specification,
and a failing line tells you what is broken rather than what ought to
happen.

### Bad
{: .spec-wrong}

<!-- example:bad rules/04-dont-use-should.test.jsx -->
```jsx
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
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/04-dont-use-should.test.jsx -->
```jsx
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
```
<!-- /example -->
