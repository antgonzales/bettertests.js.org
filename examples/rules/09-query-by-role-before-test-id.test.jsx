import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from '../src/SignUpForm.jsx';

// example:bad
// Problem: test ids prove nothing about labels or roles. The form could
// lose its <label> elements and this test would still pass.
describe('<SignUpForm />', () => {
  it('requires an email and a password', async () => {
    render(<SignUpForm />);
    await userEvent.type(screen.getByTestId('signup-email'), 'ada@example.com');
    expect(screen.getByTestId('signup-email')).toHaveValue('ada@example.com');
    expect(screen.getByTestId('signup-password')).toBeRequired();
  });
});
// example:end

// example:good
describe('<SignUpForm />', () => {
  it('requires an email and a password', async () => {
    render(<SignUpForm />);
    const email = screen.getByRole('textbox', { name: 'Email' });
    await userEvent.type(email, 'ada@example.com');
    expect(email).toHaveValue('ada@example.com');
    // Password inputs have no ARIA role, so fall back to the label.
    expect(screen.getByLabelText('Password')).toBeRequired();
  });
});
// example:end
