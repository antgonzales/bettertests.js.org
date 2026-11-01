---
layout: recommendation
title: "Describe behavior, not implementation"
---
A title says what the user or caller gets, not how the code produces it.
"Invites guests to sign in" survives a redesign; "renders the guest-banner
element when user prop is null" changes with every refactor. Words like
"correctly" and "properly" describe nothing. If you cannot name the behavior,
you do not yet know what the test protects.

### Bad
{: .spec-wrong}

<!-- example:bad rules/03-describe-behavior-not-implementation.test.jsx -->
```jsx
// Problem: the titles describe how the code works today, so a refactor
// that keeps the behavior forces a rename. "Correctly" says nothing.
describe('<ProductPage />', () => {
  it('renders the guest-banner element when user prop is null', () => {
    render(<ProductPage product={buildProduct()} user={null} />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  });
});

describe('transformData()', () => {
  it('transforms data correctly', () => {
    expect(transformData([{ id: 1, display_name: 'Mug', price_cents: 1250 }])).toEqual([
      { id: 1, name: 'Mug', price: '$12.50' },
    ]);
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/03-describe-behavior-not-implementation.test.jsx -->
```jsx
describe('<ProductPage />', () => {
  it('invites guests to sign in', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  });
});

describe('transformData()', () => {
  it('formats prices in dollars', () => {
    expect(transformData([{ id: 1, display_name: 'Mug', price_cents: 1250 }])).toEqual([
      { id: 1, name: 'Mug', price: '$12.50' },
    ]);
  });
});
```
<!-- /example -->
