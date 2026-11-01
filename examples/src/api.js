export const API_URL = 'https://shop.example/api';

export async function createAccount({ email, password }) {
  const response = await fetch(`${API_URL}/accounts`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }
  return response.json();
}
