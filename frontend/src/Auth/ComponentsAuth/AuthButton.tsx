import type { ButtonHTMLAttributes } from 'react';
import './AuthButton.css';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  children: React.ReactNode;
}

export default function AuthButton({ 
  variant = 'primary', 
  loading = false, 
  children, 
  disabled,
  ...props 
}: AuthButtonProps) {
  return (
    <button
      className={`auth-button auth-button-${variant}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
}

