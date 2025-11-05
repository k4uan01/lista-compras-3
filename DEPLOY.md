# 🚀 Guia de Deploy na Vercel

## Pré-requisitos
- Projeto no GitHub
- Conta na Vercel (gratuita)

## Passo a Passo

### 1. Preparar o Repositório
Os arquivos de configuração já foram criados:
- `vercel.json` - Configuração principal
- `.vercelignore` - Arquivos ignorados no deploy

### 2. Fazer Deploy na Vercel

#### Opção A: Via Interface Web (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New Project"**
3. Importe seu repositório do GitHub
4. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (raiz do projeto)
   - **Build Command**: `npm run build --prefix frontend && npm run build --prefix backend`
   - **Output Directory**: `frontend/dist`

5. Configure as variáveis de ambiente (se houver):
   - Clique em **"Environment Variables"**
   - Adicione suas variáveis (ex: chaves do Supabase)
   
6. Clique em **"Deploy"**

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

### Para o Backend na Vercel:
- O backend será executado como Serverless Functions
- Cada requisição será uma função individual
- **Limitação**: A Vercel tem timeout de 10s no plano gratuito

### Alternativas para o Backend:
Se preferir hospedar o backend separadamente:
- **Railway**: Deploy de Node.js com banco de dados
- **Render**: Plano gratuito com containers
- **Fly.io**: Deploy de aplicações full-stack
- **Heroku**: Plano gratuito limitado

## 🔧 Estrutura de Deploy

```
Vercel Deploy
├── Frontend (React + Vite)
│   └── Hospedado no CDN da Vercel
└── Backend (Express + TypeScript)
    └── Convertido para Serverless Functions
```

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

