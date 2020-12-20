---
layout: recommendation
title:  "Nest describe blocks for context"
---
Nesting should be avoided but when testing user flows, describe
blocks can provide additional context.

Bad
```
describe('<ProductPage />', () => {
  it('displays the user as a guest when not logged in', () => {});

  it('prompts the user to login/signup in cart when not logged in', () => {});
  
  it('allows the user to proceed as a guest to checkout when not logged in', () => {});
});
```

Good
```
describe('<ProductPage/>', () => {
  describe('when user is a guest', () => {
    it('displays the user as a guest', () => {});

    it('prompts the user to login/signup in cart', () => {});
  
    it('allows the user to proceed as a guest', () => {});
  });
});
```
