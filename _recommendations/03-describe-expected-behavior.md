---
layout: recommendation
title:  "Describe expected behavior"
---
A test assertion should describe the desired behavior, not the implementation
details. Additionally, tests should describe behavior as clearly as possible.

Bad
```
it('responds with a 302 if the user is not logged in', () => {});

it('transforms data correctly', () => {});

it('calls onSubmit when the user clicks the button', () => {});
```

Good
```
it('redirects guest users', () => {});

it('retreives column ids from columns', () => {});

it('submits the form', () => {});
```


