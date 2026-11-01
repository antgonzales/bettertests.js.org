---
layout: recommendation
title: "Test what the user sees"
---
Assert on what appears on screen: text, roles, visible state. Class names,
element order and component internals are implementation details that change
in refactors users never notice. [Testing Library](https://testing-library.com/)
enforces this in component tests; [Playwright](https://playwright.dev/) does the
same in a real browser, and [Puppeteer](https://pptr.dev/) is a fine lower-level
option. PhantomJS and Nightmare are unmaintained; drop them.

### Bad
{: .spec-wrong}

<!-- example:bad rules/08-test-what-the-user-sees.test.jsx -->
```jsx
// Problem: asserts on class names and element order. Renaming a class or
// moving the price fails the test while the page still looks right.
describe('<ProductPage />', () => {
  it('shows the price', () => {
    const product = buildProduct({ priceCents: 19900 });
    const { container } = render(<ProductPage product={product} />);
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
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/08-test-what-the-user-sees.test.jsx -->
```jsx
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
```
<!-- /example -->
