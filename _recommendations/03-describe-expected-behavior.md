---
layout: recommendation
title:  "Describe expected behavior"
---
Describe the expected behavior as clearly as possible, not the
implementation details.

### Bad
{: .spec-wrong}

```javascript
it('responds with a 302 if the user is not logged in', () => {});

it('transforms data correctly', () => {});

it('calls onSubmit when the user clicks the button', () => {});
```

### Good
{: .spec-right}

```javascript
it('redirects guest users', () => {});

it('retreives column ids from columns', () => {});

it('submits the form', () => {});
```


