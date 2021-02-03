---
layout: recommendation
title:  "Don't use mocks"
---
Mocks are a code smell. Mocks are tempting but often test too much
implementation and not enough behavior. Instead, find a way to stub the
environment the way JSDOM stubs a browser DOM. You may want to use different
tools in the future, and testing their implementation details will only stop you
from refactoring.

Recomended libraries:

* [nock](https://github.com/nock/nock)
* [msw](https://mswjs.io/)
* [miragejs](https://miragejs.com/)
* [cypress.io](https://docs.cypress.io/guides/guides/network-requests.htm)

### Bad
{: .spec-wrong}

```javascript
jest.mock('axios);

it('signs up a new user', () => {
  const {getByTestId} = render(<UserForm />);
  fireEvent.click(getByTestId('form-signup'));
  expect(axios.post).toHaveBeenCalledWith(
    'http://localhost.com/user/new',
    expect.anything()
  );
  expect(getByTestId('form-signup-success')).toBeTruthy();
});
```

### Good
{: .spec-right}

```javascript
it('signs up a new user', () => {
  nock('http://localhost.com/user')
    .post('/new')
    .reply(200);

  const {getByTestId} = render(<UserForm onSubmit={onSubmit} />);
  fireEvent.click(getByTestId('form-signup'));
  expect(getByTestId('form-signup-success')).toBeTruthy();
});
```
