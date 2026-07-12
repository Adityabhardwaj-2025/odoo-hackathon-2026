import React, { useState } from 'react';
import styles from './LoginPage.module.css';


export default function LoginPage({
  onLogin = () => {},
  onSignup = () => {},
  onForgotPassword = () => {},
  isLoading = false,
  errorMessage = '',
}) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      onLogin({ email: form.email, password: form.password });
    } else {
      onSignup({ name: form.name, email: form.email, password: form.password });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.brandSide}>
          <div className={styles.brandMark}>
            <span className={styles.brandTag}>AF-0001</span>
          </div>
          <h1 className={styles.brandTitle}>AssetFlow</h1>
          <p className={styles.brandSubtitle}>
            Track every asset, booking and request in one place — no more
            spreadsheets, no more guessing who has what.
          </p>
          <ul className={styles.brandList}>
            <li>Full asset lifecycle tracking</li>
            <li>Conflict-free resource booking</li>
            <li>Structured maintenance &amp; audit workflows</li>
          </ul>
        </div>

        <div className={styles.formSide}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => setMode('login')}
            >
              Log in
            </button>
            <button
              type="button"
              className={`${styles.tab} ${mode === 'signup' ? styles.tabActive : ''}`}
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </div>

          <h2 className={styles.formTitle}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className={styles.formHint}>
            {mode === 'login'
              ? 'Log in with your work email.'
              : 'This creates an employee account. An admin will assign your role.'}
          </p>

          {errorMessage ? <div className={styles.error}>{errorMessage}</div> : null}

          <form onSubmit={handleSubmit} className={styles.form}>
            {mode === 'signup' && (
              <label className={styles.field}>
                <span>Full name</span>
                <input
                  type="text"
                  required
                  placeholder="Priya Sharma"
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </label>
            )}

            <label className={styles.field}>
              <span>Work email</span>
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange('email')}
              />
            </label>

            <label className={styles.field}>
              <span>Password</span>
              <input
                type="password"
                required
                minLength={8}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange('password')}
              />
            </label>

            {mode === 'login' && (
              <button
                type="button"
                className={styles.forgotLink}
                onClick={() => onForgotPassword(form.email)}
              >
                Forgot password?
              </button>
            )}

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading
                ? 'Please wait…'
                : mode === 'login'
                ? 'Log in'
                : 'Create account'}
            </button>
          </form>

          <p className={styles.switchLine}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className={styles.switchLink}
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}