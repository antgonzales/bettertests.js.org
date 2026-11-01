---
layout: recommendation
title: "Nest describe blocks for context"
---
Put a shared condition in a nested describe block ("when the user is a guest")
instead of repeating it in every title. The report then reads as a sentence:
ProductPage, when the user is a guest, links to sign in. Stop at two or three
levels; deeper trees hide which setup applies to a test.

### Bad
{: .spec-wrong}

<!-- example:bad rules/02-nest-describe-blocks-for-context.test.jsx -->
```jsx
// Problem: every title repeats the same condition, and the condition is
// easy to leave out of one of them.
describe('<ProductPage />', () => {
  it('shows a guest banner when the user is not signed in', () => {
    render(<ProductPage product={buildProduct()} />);
    expect(screen.getByRole('status')).toHaveTextContent('Browsing as a guest');
  });

  it('links to sign in when the user is not signed in', () => {
    render(<ProductPage product={buildProduct()} />);
    const signIn = screen.getByRole('link', { name: 'Sign in' });
    expect(signIn).toHaveAttribute('href', '/sign-in');
  });

  it('greets the user by name when the user is signed in', () => {
    const user = buildUser({ name: 'Ada' });
    render(<ProductPage product={buildProduct()} user={user} />);
    expect(screen.getByRole('status')).toHaveTextContent('Signed in as Ada');
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/02-nest-describe-blocks-for-context.test.jsx -->
```jsx
describe('<ProductPage />', () => {
  describe('when the user is a guest', () => {
    it('shows a guest banner', () => {
      render(<ProductPage product={buildProduct()} />);
      expect(screen.getByRole('status')).toHaveTextContent('Browsing as a guest');
    });

    it('links to sign in', () => {
      render(<ProductPage product={buildProduct()} />);
      const signIn = screen.getByRole('link', { name: 'Sign in' });
      expect(signIn).toHaveAttribute('href', '/sign-in');
    });
  });

  describe('when the user is signed in', () => {
    it('greets the user by name', () => {
      const user = buildUser({ name: 'Ada' });
      render(<ProductPage product={buildProduct()} user={user} />);
      expect(screen.getByRole('status')).toHaveTextContent('Signed in as Ada');
    });
  });
});
```
<!-- /example -->
