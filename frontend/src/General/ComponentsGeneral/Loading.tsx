import './Loading.css';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export default function Loading({ size = 'medium', text }: LoadingProps) {
  return (
    <div className="general-loading-container">
      <div className={`general-loading-spinner general-loading-${size}`}></div>
      {text && <p className="general-loading-text">{text}</p>}
    </div>
  );
}

