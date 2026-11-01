---
layout: recommendation
title: "Stub the boundary, not your modules"
---
Mocking a module you own replaces the code you meant to test. Stub at the
boundary instead: [msw](https://mswjs.io/) answers the network request your code
really makes, and fake timers (`vi.useFakeTimers()`, `jest.useFakeTimers()`)
stand in for the clock. The test then covers the URL, headers, body and error
handling, and you can refactor that module without touching a test.
[nock](https://github.com/nock/nock) remains an option; from version 14 it also
intercepts native `fetch`.

### Bad
{: .spec-wrong}

<!-- example:bad rules/11-stub-the-boundary-not-your-modules.test.jsx -->
```jsx
// Problem: mocks a module we own. The real request is never made, so a
// wrong URL, header, or body in api.js passes. (Jest: jest.spyOn)
describe('<SignUpForm />', () => {
  it('signs up a new user', async () => {
    vi.spyOn(api, 'createAccount').mockResolvedValue({ id: 1 });
    render(<SignUpForm />);
    await fillAndSubmit();
    expect(api.createAccount).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'correct horse battery',
    });
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/11-stub-the-boundary-not-your-modules.test.jsx -->
```jsx
describe('<SignUpForm />', () => {
  it('signs up a new user', async () => {
    server.use(
      http.post(`${api.API_URL}/accounts`, () =>
        HttpResponse.json({ id: 1 }, { status: 201 }),
      ),
    );
    render(<SignUpForm />);
    await fillAndSubmit();
    expect(await screen.findByRole('status')).toHaveTextContent('Check your email');
  });

  it('shows the server error when the email is taken', async () => {
    server.use(
      http.post(`${api.API_URL}/accounts`, () =>
        HttpResponse.json({ message: 'Email already registered' }, { status: 409 }),
      ),
    );
    render(<SignUpForm />);
    await fillAndSubmit();
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Email already registered');
  });
});
```
<!-- /example -->
