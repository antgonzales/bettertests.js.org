import { describe, it, expect } from 'vitest';
import { formatPrice } from '../src/transformData.js';

// example:bad
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
// example:end

// example:good
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
// example:end
