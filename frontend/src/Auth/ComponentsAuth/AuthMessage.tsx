import './AuthMessage.css';

interface AuthMessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

export default function AuthMessage({ type, message }: AuthMessageProps) {
  if (!message) return null;

  return (
    <div className={`auth-message auth-message-${type}`}>
      {message}
    </div>
  );
}

