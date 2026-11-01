---
layout: recommendation
title: "Snapshots are not the default assertion"
---
A snapshot pins every byte of the output, so any markup change fails it, and
the fix is one keystroke that nobody reviews. Use one only when the exact output
is the behavior: a serializer, an error message, generated config. For
components, assert the text and roles the behavior depends on. If you do
snapshot, keep it inline and small enough to read in a diff.

### Bad
{: .spec-wrong}

<!-- example:bad rules/12-snapshots-are-not-the-default-assertion.test.jsx -->
```jsx
// Problem: pins the banner's exact markup. Any change to that markup
// fails the test, and nobody reads the diff before pressing "update".
describe('<ProductPage />', () => {
  it('shows the guest banner', () => {
    const product = buildProduct({
      name: 'Wireless Headphones',
      priceCents: 19900,
    });
    render(<ProductPage product={product} />);
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
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/12-snapshots-are-not-the-default-assertion.test.jsx -->
```jsx
describe('<ProductPage />', () => {
  it('shows the product name and price', () => {
    const product = buildProduct({
      name: 'Wireless Headphones',
      priceCents: 19900,
    });
    render(<ProductPage product={product} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Wireless Headphones');
    expect(screen.getByText('$199.00')).toBeInTheDocument();
  });
});
```
<!-- /example -->
