---
layout: recommendation
title:  "Single expectation tests"
---
Make only one assertion for each test. One test assertion helps find errors by
displaying the exact failing test and makes your code readable. In isolated
tests, you want each example to specify one, and only one, behavior. Multiple
expectations result in unfocused and confusing tests.

### Bad
{: .spec-wrong}

```javascript
it('redirects guests to the home page and prompts them to sign in', () => {
  ...
  expect(isUserLoggedIn).toBe(false);
  expect(isHomePage).toBe(true);
  expect(hasSigninPrompt).toBe(true);
});

```

### Good
{: .spec-right}

```javascript
it('redirects guests to the home page', () => {
  ...
  expect(isHomepage).toBe(true);
});

it('redirects new accounts to the home page', () => {
  ...
  expect(hasSigninPrompt).toBe(true);
});
```
