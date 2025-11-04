import { Button } from '../ComponentsGeneral';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página não encontrada</h2>
        <p className="not-found-text">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button onClick={handleGoHome} variant="primary" size="large">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
}

