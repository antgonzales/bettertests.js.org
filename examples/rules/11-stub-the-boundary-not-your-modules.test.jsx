import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { SignUpForm } from '../src/SignUpForm.jsx';
import * as api from '../src/api.js';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

async function fillAndSubmit() {
  await userEvent.type(screen.getByRole('textbox', { name: 'Email' }), 'ada@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'correct horse battery');
  await userEvent.click(screen.getByRole('button', { name: 'Create account' }));
}

// example:bad
// Problem: mocks a module we own. The real request is never made, so a
// wrong URL, header, or body in api.js passes. (Jest: jest.spyOn)
describe('<SignUpForm />', () => {
  it('signs up a new user', async () => {
    vi.spyOn(api, 'createAccount').mockResolvedValue({ id: 1 });
    render(<SignUpForm />);
    await fillAndSubmit();
    expect(api.createAccount).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'correct horse battery',
    });
  });
});
// example:end

// example:good
describe('<SignUpForm />', () => {
  it('signs up a new user', async () => {
    server.use(
      http.post(`${api.API_URL}/accounts`, () => HttpResponse.json({ id: 1 }, { status: 201 })),
    );
    render(<SignUpForm />);
    await fillAndSubmit();
    expect(await screen.findByRole('status')).toHaveTextContent('Check your email');
  });

  it('shows the server error when the email is taken', async () => {
    server.use(
      http.post(`${api.API_URL}/accounts`, () =>
        HttpResponse.json({ message: 'Email already registered' }, { status: 409 }),
      ),
    );
    render(<SignUpForm />);
    await fillAndSubmit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Email already registered');
  });
});
// example:end
