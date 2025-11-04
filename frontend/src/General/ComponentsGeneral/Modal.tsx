import type { ReactNode } from 'react';
import { useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export default function Modal({ isOpen, onClose, title, children, size = 'medium' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="general-modal-backdrop" onClick={handleBackdropClick}>
      <div className={`general-modal general-modal-${size}`}>
        <div className="general-modal-header">
          {title && <h2 className="general-modal-title">{title}</h2>}
          <button className="general-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="general-modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

