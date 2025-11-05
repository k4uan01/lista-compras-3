# 🚀 API Serverless Functions

Esta pasta contém as Serverless Functions que serão executadas na Vercel em produção.

## 📁 Estrutura

Cada arquivo `.ts` nesta pasta se torna automaticamente um endpoint API:

```
api/
├── hello.ts    → https://seu-site.vercel.app/api/hello
├── health.ts   → https://seu-site.vercel.app/api/health
└── [nome].ts   → https://seu-site.vercel.app/api/[nome]
```

## 🔧 Como Criar uma Nova API

1. **Crie um arquivo** na pasta `api/`:

```typescript
// api/users.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Métodos HTTP
  if (req.method === 'GET') {
    return res.status(200).json({ users: [] });
  }
  
  if (req.method === 'POST') {
    const data = req.body;
    return res.status(201).json({ message: 'Criado!', data });
  }
  
  return res.status(405).json({ error: 'Método não permitido' });
}
```

2. **Acesse** o endpoint:
   - Local: Configure o Vercel CLI (`vercel dev`)
   - Produção: `https://seu-site.vercel.app/api/users`

## ⚡ Características

- ✅ **Auto-scaling**: Escala automaticamente com a demanda
- ✅ **Deploy Instantâneo**: Deploy em segundos
- ✅ **TypeScript**: Suporte nativo
- ⚠️ **Timeout**: 10s no plano gratuito (60s no Pro)
- ⚠️ **Stateless**: Sem persistência entre requisições

## 🌐 CORS

Para habilitar CORS em uma função:

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Sua lógica aqui
  return res.status(200).json({ message: 'OK' });
}
```

## 🔗 Conectar com Supabase

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  return res.status(200).json({ data });
}
```

## 📝 Variáveis de Ambiente

Configure no painel da Vercel em **Settings > Environment Variables**:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- Outras variáveis necessárias

## 🐛 Debug Local

Para testar localmente com as Serverless Functions:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Rodar em modo dev (simula produção)
vercel dev
```

Acesse: `http://localhost:3000`

## 📚 Documentação

- [Vercel Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vercel Node.js Runtime](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Edge Functions](https://vercel.com/docs/functions/edge-functions)

