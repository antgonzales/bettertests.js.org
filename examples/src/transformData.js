/**
 * Turns API rows (snake_case, price in cents) into view models
 * (camelCase, formatted price). Rows without an id are dropped.
 */
export function transformData(rows) {
  return rows
    .filter((row) => row.id != null)
    .map((row) => ({
      id: row.id,
      name: row.display_name,
      price: formatPrice(row.price_cents),
    }));
}

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
