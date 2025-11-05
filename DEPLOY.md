# 🚀 Guia de Deploy na Vercel

## Pré-requisitos
- Projeto no GitHub
- Conta na Vercel (gratuita)

## Estrutura do Projeto

```
lista-compras/
├── frontend/          # React + Vite (será hospedado no CDN)
├── api/              # Serverless Functions (rotas /api/*)
├── backend/          # Backend Express original (para dev local)
├── vercel.json       # Configuração do deploy
└── package.json      # Dependências para API functions
```

## Passo a Passo

### 1. Preparar o Repositório

Os arquivos de configuração já foram criados:
- ✅ `vercel.json` - Configuração principal (sem warnings!)
- ✅ `.vercelignore` - Arquivos ignorados no deploy
- ✅ `api/` - Pasta com Serverless Functions
- ✅ `package.json` - Dependências da raiz

### 2. Fazer Deploy na Vercel

#### Opção A: Via Interface Web (Recomendado) ⭐

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New Project"**
3. Importe seu repositório do GitHub
4. **IMPORTANTE**: A Vercel vai detectar automaticamente as configurações
   - ✅ Framework: Vite (detectado automaticamente)
   - ✅ Build Command: Definido no `vercel.json`
   - ✅ Output Directory: `frontend/dist`
   - ✅ Install Command: Definido no `vercel.json`

5. Configure as variáveis de ambiente (se houver):
   - Clique em **"Environment Variables"**
   - Adicione suas variáveis (ex: chaves do Supabase)
   
6. Clique em **"Deploy"** e aguarde!

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

### 3. Configurar Variáveis de Ambiente

Se seu projeto usa Supabase ou outras APIs, adicione as variáveis de ambiente:

1. No painel da Vercel, vá em **Settings > Environment Variables**
2. Adicione as variáveis necessárias:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - Outras variáveis do backend

### 4. Configurar Domínio Customizado (Opcional)

1. Vá em **Settings > Domains**
2. Adicione seu domínio customizado
3. Configure o DNS conforme instruções

## ⚠️ Importante

### Estrutura de APIs na Vercel

A Vercel automaticamente converte arquivos na pasta `/api` em Serverless Functions:

- **`/api/hello.ts`** → disponível em `https://seu-site.vercel.app/api/hello`
- **`/api/health.ts`** → disponível em `https://seu-site.vercel.app/api/health`

**Características:**
- ✅ Cada arquivo é uma função independente
- ✅ Auto-scaling automático
- ✅ Deploy rápido
- ⚠️ Timeout de 10s no plano gratuito
- ⚠️ 100 GB de largura de banda/mês

### Backend Local vs Produção

**Desenvolvimento (Local):**
- Use a pasta `backend/` com Express normalmente
- Rode: `npm run dev --prefix backend`
- Acesse: `http://localhost:3001`

**Produção (Vercel):**
- As funções da pasta `api/` serão usadas
- Frontend: `https://seu-site.vercel.app`
- API: `https://seu-site.vercel.app/api/*`

### Alternativas para Backend Complexo:

Se seu backend precisa de:
- Conexões WebSocket persistentes
- Jobs em background
- Processamento > 10s

**Considere hospedar separadamente:**
- **Railway** - Ótimo para Node.js + PostgreSQL
- **Render** - Plano gratuito generoso
- **Fly.io** - Deploy global rápido
- **Heroku** - Tradicional e confiável

## 🔧 Como Adicionar Novas APIs

1. Crie um arquivo em `/api/nome-da-funcao.ts`:

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Seu código aqui
  res.status(200).json({ message: 'Funcionou!' });
}
```

2. Acesse: `https://seu-site.vercel.app/api/nome-da-funcao`

3. Deploy automático ao fazer push!

## 📝 Atualizações Automáticas

A Vercel fará deploy automaticamente quando você:
- Fizer push na branch `main` (produção)
- Criar Pull Requests (preview deployments)

## 🐛 Troubleshooting

### Build falhou
- Verifique se todas as dependências estão no `package.json`
- Confirme que o projeto buildar localmente
- Verifique logs de build na Vercel

### Variáveis de ambiente não funcionam
- Certifique-se de que as variáveis começam com `VITE_` no frontend
- Redeploy após adicionar novas variáveis

### Backend não funciona
- Verifique se as rotas estão configuradas corretamente
- Considere usar alternativas mencionadas acima

## 🔗 Links Úteis
- [Documentação Vercel](https://vercel.com/docs)
- [Deploy Vite na Vercel](https://vercel.com/docs/frameworks/vite)
- [Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

