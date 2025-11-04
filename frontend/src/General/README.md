# Módulo General

Módulo de componentes e páginas gerais do sistema de Lista de Compras.

## Estrutura

```
General/
├── PagesGeneral/          # Páginas gerais do sistema
│   ├── NotFoundPage.tsx
│   ├── NotFoundPage.css
│   └── index.ts
│
├── ComponentsGeneral/     # Componentes reutilizáveis gerais
│   ├── Button.tsx
│   ├── Button.css
│   ├── Input.tsx
│   ├── Input.css
│   ├── Card.tsx
│   ├── Card.css
│   ├── Modal.tsx
│   ├── Modal.css
│   ├── Loading.tsx
│   ├── Loading.css
│   └── index.ts
│
└── index.ts              # Exportações principais do módulo
```

## PagesGeneral

Páginas gerais utilizadas em todo o sistema:

- **NotFoundPage**: Página 404 para rotas não encontradas
- **HomePage**: Página principal após autenticação do usuário

### Uso

```tsx
import { NotFoundPage, HomePage } from './General';

<NotFoundPage />
<HomePage />
```

## ComponentsGeneral

Componentes reutilizáveis para construir interfaces:

### Button

Botão versátil com múltiplas variantes e tamanhos.

```tsx
import { Button } from './General';

<Button
  variant="primary"    // 'primary' | 'secondary' | 'danger' | 'success'
  size="medium"       // 'small' | 'medium' | 'large'
  loading={false}
  onClick={handleClick}
>
  Clique aqui
</Button>
```

### Input

Campo de entrada estilizado com label, erro e texto auxiliar.

```tsx
import { Input } from './General';

<Input
  label="Nome"
  type="text"
  id="nome"
  placeholder="Digite seu nome"
  error="Mensagem de erro"
  helperText="Texto auxiliar"
/>
```

### Card

Container para agrupar conteúdo relacionado.

```tsx
import { Card } from './General';

<Card
  title="Título do Card"
  subtitle="Subtítulo opcional"
>
  <p>Conteúdo do card</p>
</Card>
```

### Modal

Modal responsivo com backdrop e animações.

```tsx
import { Modal } from './General';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Título do Modal"
  size="medium"    // 'small' | 'medium' | 'large'
>
  <p>Conteúdo do modal</p>
</Modal>
```

### Loading

Indicador de carregamento com texto opcional.

```tsx
import { Loading } from './General';

<Loading
  size="medium"    // 'small' | 'medium' | 'large'
  text="Carregando..."
/>
```

## Características

- ✅ Componentes totalmente tipados com TypeScript
- ✅ Design moderno e responsivo
- ✅ Animações suaves
- ✅ Acessibilidade considerada
- ✅ Fácil de personalizar com CSS
- ✅ Props intuitivas e documentadas

## Personalização

Todos os componentes aceitam a prop `className` para personalização adicional:

```tsx
<Button className="meu-botao-customizado">
  Botão personalizado
</Button>
```

## Boas Práticas

1. Use o componente `Button` em vez de botões HTML nativos
2. Use o componente `Input` para formulários consistentes
3. Use o componente `Card` para agrupar conteúdo relacionado
4. Use o componente `Modal` para interações que requerem atenção do usuário
5. Use o componente `Loading` durante operações assíncronas

