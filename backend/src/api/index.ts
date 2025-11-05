import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Rota de exemplo
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from backend!' });
});

// Rota de health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Exportar para Vercel Serverless
export default app;

