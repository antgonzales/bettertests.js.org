---
layout: recommendation
title:  "Describe the object"
---

Be clear about what function, class constructor, or component you are
describing. It's best to follow examples on
[MDN](https://developer.mozilla.org/en-US/) for how to describe Javascript
objects and their usage. For example, the function `parseInt()` is represented
with open parantheses and no parameters. For framework specific examples, check
their documentation and usage.

Bad

```javascript
describe('a function to transform data', () => {});

describe('a class to track analytics', () => {});

describe('a React component to render dates', () => {});

describe('a Vue component to render dates', () => {});

describe('a web component to render dates', () => {});
```

Good

```javascript
describe('transformData()', () => {});

describe('Analytics()', () => {});

describe('<Dates/>', () => {}); 

describe('Vue.component('dates')', () => {});

describe('<dates>', () => {});
```
