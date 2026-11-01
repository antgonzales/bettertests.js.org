import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import { SignUpForm } from '../src/SignUpForm.jsx';
import { API_URL } from '../src/api.js';

const server = setupServer(
  http.post(`${API_URL}/accounts`, async () => {
    await delay(20);
    return HttpResponse.json({ id: 1 }, { status: 201 });
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

async function fillAndSubmit() {
  const email = screen.getByRole('textbox', { name: 'Email' });
  await userEvent.type(email, 'ada@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'correct horse battery');
  await userEvent.click(screen.getByRole('button', { name: 'Create account' }));
}

// example:bad
// Problem: a fixed sleep. Too short and the test flakes; too long and
// every run pays for it. getBy* throws if the sleep was not enough.
describe('<SignUpForm />', () => {
  it('confirms the sign-up', async () => {
    render(<SignUpForm />);
    await fillAndSubmit();
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(screen.getByRole('status')).toHaveTextContent('Check your email');
  });
});
// example:end

// example:good
describe('<SignUpForm />', () => {
  it('confirms the sign-up', async () => {
    render(<SignUpForm />);
    await fillAndSubmit();
    expect(await screen.findByRole('status')).toHaveTextContent('Check your email');
  });
});
// example:end
