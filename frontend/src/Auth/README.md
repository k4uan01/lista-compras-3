# Módulo Auth

Módulo de autenticação do sistema de Lista de Compras.

## Estrutura

```
Auth/
├── PagesAuth/          # Páginas de autenticação
│   ├── RegisterPage.tsx
│   ├── RegisterPage.css
│   └── index.ts
│
├── ComponentsAuth/     # Componentes reutilizáveis de autenticação
│   ├── AuthInput.tsx
│   ├── AuthInput.css
│   ├── AuthButton.tsx
│   ├── AuthButton.css
│   ├── AuthCard.tsx
│   ├── AuthCard.css
│   ├── AuthMessage.tsx
│   ├── AuthMessage.css
│   └── index.ts
│
└── index.ts           # Exportações principais do módulo
```

## PagesAuth

Contém todas as páginas relacionadas à autenticação:

- **RegisterPage**: Página de cadastro de novos usuários

### Uso

```tsx
import { RegisterPage } from './Auth';

<RegisterPage />
```

## ComponentsAuth

Componentes reutilizáveis para construir interfaces de autenticação:

### AuthInput

Campo de entrada estilizado para formulários de autenticação.

```tsx
import { AuthInput } from './Auth';

<AuthInput
  label="Email"
  type="email"
  id="email"
  placeholder="seu@email.com"
  error="Mensagem de erro opcional"
/>
```

### AuthButton

Botão estilizado com variantes e estado de loading.

```tsx
import { AuthButton } from './Auth';

<AuthButton
  variant="primary"    // 'primary' | 'secondary'
  loading={false}
  onClick={handleClick}
>
  Cadastrar
</AuthButton>
```

### AuthCard

Container para páginas de autenticação com título e subtítulo.

```tsx
import { AuthCard } from './Auth';

<AuthCard
  title="Criar Conta"
  subtitle="Cadastre-se para usar a Lista de Compras"
>
  {/* Conteúdo do formulário */}
</AuthCard>
```

### AuthMessage

Mensagens de feedback para o usuário.

```tsx
import { AuthMessage } from './Auth';

<AuthMessage
  type="error"    // 'error' | 'success' | 'info'
  message="Mensagem para o usuário"
/>
```

## Integração com Supabase

Todas as páginas utilizam o cliente Supabase configurado em `src/lib/supabase.ts`.

```tsx
import { supabase } from '../lib/supabase';

// Cadastro
const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// Logout
await supabase.auth.signOut();
```

