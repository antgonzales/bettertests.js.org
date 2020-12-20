---
layout: recommendation
title:  "Single expectation test"
---
The 'one expectation' tip is more broadly expressed as 'each test should make only one assertion'. This helps find possible error, going directly to the failing test, and to make your code readable. In isolated tests, you want each example to specify one (and only one) behavior. Multiple expectations in the same example are a signal that you may be specifying multiple behaviors.

Bad
```
it('redirects guests to the home page and prompts them to sign in', () => {
  ...
  expect(isUserLoggedIn).toBe(false);
  expect(isHomePage).toBe(true);
  expect(hasSigninPrompt).toBe(true);
});

```

Good
```
it('redirects guests to the home page', () => {
  ...
  expect(isHomepage).toBe(true);
});

it('redirects new accounts to the home page', () => {
  ...
  expect(hasSigninPrompt).toBe(true);
});
```
