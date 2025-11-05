# 🔧 Como Configurar Variáveis do Supabase na Vercel

## ✅ Correção Aplicada

O app agora **não quebra mais** se as variáveis não estiverem configuradas! Você verá apenas warnings no console.

## 🔑 Pegar as Variáveis do Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login e abra seu projeto
3. Vá em **Settings** (Configurações) > **API**
4. Copie:
   - **Project URL** → Essa é sua `VITE_SUPABASE_URL`
   - **anon/public key** → Essa é sua `VITE_SUPABASE_ANON_KEY`

## 🚀 Adicionar na Vercel

### Método 1: Via Dashboard (Recomendado)

1. Acesse [vercel.com](https://vercel.com)
2. Clique no seu projeto **"lista-compras-3"**
3. Vá em **Settings** (na barra superior)
4. Clique em **Environment Variables** (menu lateral esquerdo)
5. Adicione as variáveis:

#### Variável 1:
- **Name**: `VITE_SUPABASE_URL`
- **Value**: Cole a URL do seu projeto Supabase
- **Environments**: Marque todas (Production, Preview, Development)
- Clique em **Save**

#### Variável 2:
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Value**: Cole a chave anon/public do Supabase
- **Environments**: Marque todas (Production, Preview, Development)
- Clique em **Save**

### Método 2: Redeployar após adicionar variáveis

**IMPORTANTE:** Depois de adicionar as variáveis, você precisa fazer **Redeploy**:

1. Vá em **Deployments**
2. Clique nos **3 pontinhos (...)** do último deployment
3. Clique em **"Redeploy"**
4. Aguarde o redeploy terminar

## 🎯 Como Testar se Funcionou

Após o redeploy:

1. Acesse seu site na Vercel
2. Abra o Console (F12)
3. **Se as variáveis estão configuradas:**
   - ✅ Não vai aparecer o warning amarelo
   - ✅ O Supabase vai funcionar normalmente

4. **Se ainda não estão configuradas:**
   - ⚠️ Vai aparecer: "Variáveis de ambiente do Supabase não configuradas"
   - ✅ Mas o app vai funcionar normalmente (só não vai conectar no Supabase)

## 📝 Exemplo de Variáveis

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjg4ODAwMCwiZXhwIjoxOTI4NDY0MDAwfQ.abcdefghijklmnopqrstuvwxyz123456789
```

## 🐛 Troubleshooting

### As variáveis não aparecem depois de adicionar

1. Certifique-se de clicar em **Save** depois de adicionar cada variável
2. Faça **Redeploy** (não é automático quando adiciona variáveis)
3. Aguarde o redeploy completar (1-2 minutos)

### O warning continua aparecendo

1. Verifique se os nomes estão **exatamente** assim:
   - `VITE_SUPABASE_URL` (não `SUPABASE_URL`)
   - `VITE_SUPABASE_ANON_KEY` (não `SUPABASE_ANON_KEY`)
2. No Vite, variáveis de ambiente **DEVEM** começar com `VITE_`
3. Faça Redeploy após corrigir

### Quero testar localmente

Crie um arquivo `.env` na pasta `frontend/`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-key-aqui
```

**IMPORTANTE:** Não commite esse arquivo! Ele já está no `.gitignore`

## 🎉 Resultado Final

Com as variáveis configuradas:
- ✅ Login/Register funcionará
- ✅ Listagem de produtos funcionará
- ✅ CRUD de produtos funcionará
- ✅ Todas as funcionalidades do Supabase estarão disponíveis

Sem as variáveis:
- ✅ App carrega normalmente
- ⚠️ Funcionalidades do Supabase não funcionam
- ⚠️ Warnings no console

