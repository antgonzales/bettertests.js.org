---
layout: recommendation
title: "Describe the object"
---
Name the describe block after the thing under test, written the way you would
call it: `transformData()` for a function, `<SignUpForm />` for a component,
`Analytics` for a class. The title then matches what you grep for in the
codebase, and nested blocks only have to add the condition. Prose titles drift
from the code as soon as someone renames a function.

### Bad
{: .spec-wrong}

<!-- example:bad rules/01-describe-the-object.test.jsx -->
```jsx
// Problem: prose titles drift from the code and are hard to grep for.
describe('a function to transform data', () => {
  it('drops rows without an id', () => {
    expect(transformData([{ display_name: 'No id', price_cents: 100 }])).toEqual([]);
  });
});

describe('the sign up form component', () => {
  it('asks for an email', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/01-describe-the-object.test.jsx -->
```jsx
describe('transformData()', () => {
  it('drops rows without an id', () => {
    expect(transformData([{ display_name: 'No id', price_cents: 100 }])).toEqual([]);
  });
});

describe('<SignUpForm />', () => {
  it('asks for an email', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
  });
});
```
<!-- /example -->
