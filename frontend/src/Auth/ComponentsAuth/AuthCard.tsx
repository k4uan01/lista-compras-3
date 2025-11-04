import type { ReactNode } from 'react';
import './AuthCard.css';

interface AuthCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="auth-card-container">
      <div className="auth-card">
        {title && <h1 className="auth-card-title">{title}</h1>}
        {subtitle && <p className="auth-card-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

