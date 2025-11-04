import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function Card({ children, title, subtitle, className = '' }: CardProps) {
  return (
    <div className={`general-card ${className}`}>
      {(title || subtitle) && (
        <div className="general-card-header">
          {title && <h2 className="general-card-title">{title}</h2>}
          {subtitle && <p className="general-card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="general-card-content">
        {children}
      </div>
    </div>
  );
}

