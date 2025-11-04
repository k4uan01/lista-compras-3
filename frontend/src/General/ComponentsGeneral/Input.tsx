import type { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({ label, error, helperText, id, className = '', ...props }: InputProps) {
  return (
    <div className={`general-input-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="general-input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`general-input ${error ? 'general-input-error' : ''}`}
        {...props}
      />
      {error && <span className="general-input-error-message">{error}</span>}
      {helperText && !error && <span className="general-input-helper-text">{helperText}</span>}
    </div>
  );
}

