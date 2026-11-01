---
layout: recommendation
title: "Await everything async"
---
Anything that resolves later must be awaited: user events, `findBy*` queries,
`expect().resolves` and `expect().rejects`. An unawaited assertion passes
before it runs. Never wait with `setTimeout`; use `findBy*` or `waitFor`, which
poll and fail with a clear message. Vitest rejects the `done` callback outright
and Jest only tolerates it, so return a promise instead. For timers in your
own code, use fake timers.

### Bad
{: .spec-wrong}

<!-- example:bad rules/10-await-everything-async.test.jsx -->
```jsx
// Problem: a fixed sleep. Too short and the test flakes; too long and
// every run pays for it. getBy* throws if the sleep was not enough.
describe('<SignUpForm />', () => {
  it('confirms the sign-up', async () => {
    render(<SignUpForm />);
    await fillAndSubmit();
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(screen.getByRole('status')).toHaveTextContent('Check your email');
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/10-await-everything-async.test.jsx -->
```jsx
describe('<SignUpForm />', () => {
  it('confirms the sign-up', async () => {
    render(<SignUpForm />);
    await fillAndSubmit();
    expect(await screen.findByRole('status')).toHaveTextContent('Check your email');
  });
});
```
<!-- /example -->
