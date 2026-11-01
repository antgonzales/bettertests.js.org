---
layout: recommendation
title: "Use test.each for tables"
---
When the same assertion runs against different inputs, write the cases as a
table with `test.each` (or `it.each`) instead of copying the test. Each row
becomes its own reported test with the values in its title, adding a case is
one line, and the assertion exists in a single place. Reach for it the moment
you paste a test and change one literal. The syntax is identical in Jest.

### Bad
{: .spec-wrong}

<!-- example:bad rules/06-use-test-each-for-tables.test.jsx -->
```jsx
// Problem: four copies of the same test. Adding a case means copying a
// block and hoping you edit both the input and the title.
describe('formatPrice()', () => {
  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('formats whole dollars', () => {
    expect(formatPrice(500)).toBe('$5.00');
  });

  it('formats cents', () => {
    expect(formatPrice(1999)).toBe('$19.99');
  });

  it('formats large amounts', () => {
    expect(formatPrice(123456789)).toBe('$1234567.89');
  });
});
```
<!-- /example -->

### Good
{: .spec-right}

<!-- example:good rules/06-use-test-each-for-tables.test.jsx -->
```jsx
describe('formatPrice()', () => {
  it.each([
    { cents: 0, label: 'zero', expected: '$0.00' },
    { cents: 500, label: 'whole dollars', expected: '$5.00' },
    { cents: 1999, label: 'cents', expected: '$19.99' },
    { cents: 123456789, label: 'large amounts', expected: '$1234567.89' },
  ])('formats $label as $expected', ({ cents, expected }) => {
    expect(formatPrice(cents)).toBe(expected);
  });
});
```
<!-- /example -->
