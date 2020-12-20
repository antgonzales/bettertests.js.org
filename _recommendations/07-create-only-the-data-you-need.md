---
layout: recommendation
title:  "Create only the data you need"
---
It's tempting to setup all the data required to avoid errors. Howevever, this
makes testing in isolation difficult and doesn't allow you to address situations
with missing data. Instead, add data for specific contexts or individual tests
only when necessary.

Bad
```
describe('<AccountPage/>', () => {
  beforeEach(signInUser);
  beforeEach(generateOrderHistory);
  beforeEach(generateUserPreferences);
  ...
});
```

Good

```
describe('<AccountPage/>', () => {
  it('redirects users who are not signed in', () => {});

  describe('when a user is signed in', () => {
    beforeEach(signInUser);
    it('displays a message when the order history is empty', () => {});
    
    it('displays the order history', () => {
      generateOrderHistory();
      ...
    });
    
    it('sets the users preferences', () => {});

    it('displays the users previous preferences', () => {
      generateUserPreferences();
      ....
    });
  });
});
```
