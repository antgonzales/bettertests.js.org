let nextId = 1;

export function buildProduct(overrides = {}) {
  return { id: nextId++, name: 'Wireless Headphones', priceCents: 19900, ...overrides };
}

export function buildUser(overrides = {}) {
  return { id: nextId++, name: 'Ada', email: 'ada@example.com', ...overrides };
}

export function buildReview(overrides = {}) {
  return { id: nextId++, body: 'Great sound.', ...overrides };
}
