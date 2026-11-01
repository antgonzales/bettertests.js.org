---
layout: recommendation
title: "Query by role, label and text before test id"
---
Testing Library ranks its queries for a reason. `getByRole` with a name finds
the element the way assistive technology does, so it fails when a label goes
missing. `getByLabelText` and `getByText` come next. `getByTestId` is the last
resort for elements with no accessible identity, such as a layout container. A
test full of test ids tells you nothing about accessibility.

### Bad
{: .spec-wrong}

<!-- example:bad rules/09-query-by-role-before-test-id.test.jsx -->
```jsx
// Problem: test ids prove nothing about labels or roles. The form could
// lose its <label> elements and this test would still pass.
describe('<SignUpForm />', () => {
  it('requires an email and a password', async () => {
    render(<SignUpForm />);
    await userEvent.type(screen.getByTestId('signup-email'), 'ada@example.com');
    expect(screen.getByTestId('signup-email')).toHaveValue('ada@example.com');
    expect(screen.getByTestId('signup-password')).toBeRequired();
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/09-query-by-role-before-test-id.test.jsx -->
```jsx
describe('<SignUpForm />', () => {
  it('requires an email and a password', async () => {
    render(<SignUpForm />);
    await userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'ada@example.com');
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue('ada@example.com');
    // Password inputs have no ARIA role, so fall back to the label.
    expect(screen.getByLabelText('Password')).toBeRequired();
  });
});
```
<!-- /example -->
