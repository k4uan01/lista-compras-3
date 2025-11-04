import type { InputHTMLAttributes } from 'react';
import './AuthInput.css';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthInput({ label, error, id, ...props }: AuthInputProps) {
  return (
    <div className="auth-input-group">
      <label htmlFor={id} className="auth-input-label">
        {label}
      </label>
      <input
        id={id}
        className={`auth-input ${error ? 'auth-input-error' : ''}`}
        {...props}
      />
      {error && <span className="auth-input-error-message">{error}</span>}
    </div>
  );
}

