---
layout: recommendation
title:  "Nest describe blocks for context"
---
Avoid nesting when testing user flows. Describe blocks are better at providing additional context.

### Bad
{: .spec-wrong}

```javascript
describe('<ProductPage />', () => {
  it('displays the user as a guest when not logged in', () => {});

  it('prompts the user to login/signup in cart when not logged in', () => {});
  
  it('allows the user to proceed as a guest to checkout when not logged in', () => {});
});
```

### Good
{: .spec-right}

```javascript
describe('<ProductPage/>', () => {
  describe('when user is a guest', () => {
    it('displays the user as a guest', () => {});

    it('prompts the user to login/signup in cart', () => {});
  
    it('allows the user to proceed as a guest', () => {});
  });
});
```
