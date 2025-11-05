# 🔧 Troubleshooting - Página em Branco na Vercel

## ✅ Correções Aplicadas

As seguintes correções foram implementadas para resolver a página em branco:

### 1. **Configuração de Rewrites no `vercel.json`**
- Adicionado redirecionamento de todas as rotas para `index.html`
- Isso é necessário para o React Router funcionar corretamente

### 2. **Arquivo `_redirects` no Public**
- Criado arquivo de fallback para SPAs

### 3. **Debug Logs no `main.tsx`**
- Adicionados console.logs para verificar se o app está carregando

### 4. **Título atualizado**
- Alterado de "frontend" para "Lista de Compras"

## 🚀 Como Aplicar as Correções

### 1. Commit e Push das Alterações

```bash
git add .
git commit -m "fix: configure SPA routing for Vercel"
git push origin main
```

### 2. Aguardar o Redeploy Automático
- A Vercel vai detectar o push e fazer redeploy automaticamente
- Aguarde 1-2 minutos
- Acesse o painel da Vercel para ver o progresso

### 3. Verificar no Navegador
- Acesse seu domínio na Vercel
- Abra o **DevTools** (F12)
- Vá na aba **Console**
- Você deve ver:
  ```
  🚀 App iniciando...
  ✅ Root element encontrado, renderizando App...
  ```

## 🐛 Se Ainda Estiver em Branco

### Verificar Console do Navegador (F12)

1. **Abra o DevTools** (F12 ou Ctrl+Shift+I)
2. **Vá na aba Console**
3. **Procure por erros em vermelho**

#### Erros Comuns:

**❌ Erro: "Failed to fetch dynamically imported module"**
```
Solução: Limpe o cache do navegador (Ctrl+Shift+Delete)
ou tente em modo anônimo (Ctrl+Shift+N)
```

**❌ Erro: "Uncaught SyntaxError"**
```
Solução: Verifique se o build foi feito corretamente na Vercel
Vá em Vercel Dashboard > Deployments > Logs
```

**❌ Erro: "CORS policy"**
```
Solução: Adicione as variáveis de ambiente corretas
(VITE_SUPABASE_URL, etc)
```

**❌ Nenhum erro, mas página em branco**
```
Solução: Verifique se o CSS está carregando
Vá na aba Network e veja se todos os arquivos foram baixados
```

### Verificar Build na Vercel

1. **Acesse o Dashboard da Vercel**
2. **Clique no projeto**
3. **Vá em "Deployments"**
4. **Clique no último deployment**
5. **Vá em "Build Logs"**

**O build deve mostrar:**
```
✓ building client + server bundles...
✓ 50 modules transformed.
✓ built in 2.34s
```

**Se mostrar erro:**
- Verifique os logs de erro
- Corrija e faça novo commit

### Forçar Redeploy na Vercel

Se o build passou mas a página continua em branco:

1. **Vá no Dashboard da Vercel**
2. **Clique nos 3 pontinhos (...) do deployment**
3. **Clique em "Redeploy"**
4. **Marque "Use existing build cache: No"**
5. **Clique em "Redeploy"**

### Testar Localmente Primeiro

Antes de fazer deploy, teste localmente:

```bash
# Entre na pasta frontend
cd frontend

# Build de produção
npm run build

# Preview do build
npm run preview
```

Acesse `http://localhost:4173` e veja se funciona.

## 📋 Checklist de Verificação

- [ ] Fiz commit e push das alterações?
- [ ] O build na Vercel passou sem erros?
- [ ] Verifiquei o Console do navegador (F12)?
- [ ] Tentei limpar o cache ou modo anônimo?
- [ ] Verifiquei a aba Network se os arquivos foram baixados?
- [ ] Testei o build localmente com `npm run preview`?

## 🆘 Ainda não Funciona?

### Debug Avançado

1. **Verificar se o `index.html` está sendo servido:**
   ```bash
   curl https://seu-dominio.vercel.app
   ```
   Deve retornar o HTML completo.

2. **Verificar os arquivos estáticos:**
   ```bash
   curl https://seu-dominio.vercel.app/assets/index-[hash].js
   ```
   Deve retornar o código JavaScript.

3. **Verificar variáveis de ambiente:**
   - Vá em Vercel Dashboard > Settings > Environment Variables
   - Certifique-se que todas as variáveis estão corretas
   - Variáveis do frontend DEVEM começar com `VITE_`

### Teste com Build Local na Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Build e preview local (simula produção)
vercel build
vercel dev --prod
```

## 🔍 Informações Importantes

### Estrutura de Rotas React Router

O app usa `BrowserRouter` que requer configuração de servidor:
- ✅ `vercel.json` com rewrites → Configurado
- ✅ `_redirects` no public → Configurado
- ✅ `public/vercel.json` → Configurado

### Variáveis de Ambiente

Certifique-se de que as variáveis estão definidas:
```env
VITE_SUPABASE_URL=sua-url-aqui
VITE_SUPABASE_ANON_KEY=sua-key-aqui
```

**IMPORTANTE:** Variáveis do Vite DEVEM começar com `VITE_`

## 📞 Precisa de Mais Ajuda?

Se nada funcionar, me envie:
1. Print do Console (F12 > Console)
2. Print da aba Network (F12 > Network)
3. Print dos Build Logs da Vercel
4. URL do seu projeto na Vercel

Isso vai ajudar a identificar o problema exato!

