import { useState } from 'react';
import { createAccount } from './api.js';

export function SignUpForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('submitting');
    try {
      await createAccount({
        email: form.get('email'),
        password: form.get('password'),
      });
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return <p role="status">Check your email to confirm your account.</p>;
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Sign up">
      <label>
        Email
        <input name="email" type="email" required data-testid="signup-email" />
      </label>
      <label>
        Password
        <input name="password" type="password" required data-testid="signup-password" />
      </label>
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={status === 'submitting'} data-testid="signup-submit">
        Create account
      </button>
    </form>
  );
}
