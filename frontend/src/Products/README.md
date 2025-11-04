# Módulo Products

Este módulo contém todas as funcionalidades relacionadas aos produtos do sistema de lista de compras.

## ⚙️ Configuração Necessária

### 1. Variáveis de Ambiente

Certifique-se de ter as seguintes variáveis configuradas no arquivo `.env`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### 2. Supabase Storage

Crie o bucket `images` no Supabase Storage:
1. Acesse o painel do Supabase
2. Vá em Storage > Create bucket
3. Nome: `images`
4. Configure as permissões conforme necessário

A pasta `products/` será criada automaticamente no upload.

### 3. Edge Function

Certifique-se de que a edge function `post-create-product` está deployada:
- Localização: `supabase/functions/post-create-product`
- Método: POST
- Autenticação: Bearer Token (JWT)

## Estrutura

```
Products/
├── PagesProducts/          # Páginas relacionadas a produtos
│   └── index.ts           # Exportações das páginas
├── ComponentsProducts/     # Componentes específicos de produtos
│   └── index.ts           # Exportações dos componentes
├── index.ts               # Exportações gerais do módulo
└── README.md              # Este arquivo
```

## Páginas (PagesProducts)

### CreateProductPage

Página para criar novos produtos na lista de compras.

**Fluxo de criação:**
1. **Validações**: Valida todos os campos do formulário
2. **Upload de Imagem** (opcional):
   - Upload para `images/products/` no Supabase Storage
   - Nome único: `timestamp-random.extensão`
   - Obtém URL pública
3. **Chamada à Edge Function**:
   - POST para `/functions/v1/post-create-product`
   - Autenticação via JWT Bearer Token
4. **Feedback**: Mensagem de sucesso e redirecionamento

**Dados enviados:**
```typescript
{
  p_name: string,           // Nome (max 255 chars)
  p_amount: number,         // Quantidade (1-32767)
  p_amount_type: string,    // Tipo: "unit" (Unidade)
  p_price: number,          // Preço (>= 0)
  p_observations: string,   // Observações (max 1000 chars, opcional)
  p_image: string | null    // URL da imagem (opcional)
}
```

**Outras páginas (exemplos):**
- `ProductsListPage` - Listagem de produtos
- `ProductDetailPage` - Detalhes de um produto

## Componentes (ComponentsProducts)

Componentes reutilizáveis específicos para funcionalidades de produtos. Exemplos:
- `ProductCard` - Card para exibir informações de um produto
- `ProductForm` - Formulário para adicionar/editar produtos
- `ProductList` - Lista de produtos
- `CategorySelector` - Seletor de categorias

## Como Usar

### Importar uma página:
```typescript
import { CreateProductPage } from '@/Products';
```

### Importar um componente:
```typescript
import { ProductCard } from '@/Products';
```

### Navegar para criar produto:
```typescript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/products/create');
```

## Nomenclatura

- **Páginas**: Use PascalCase com sufixo "Page" (ex: `ProductsListPage`)
- **Componentes**: Use PascalCase (ex: `ProductCard`)
- **Arquivos**: Devem ter o mesmo nome do componente/página

## Boas Práticas

1. Mantenha os componentes reutilizáveis e específicos do domínio de produtos
2. Use TypeScript para tipagem forte
3. Crie interfaces/types quando necessário
4. Mantenha a responsividade (desktop)
5. Siga o design system com as cores:
   - Cor principal: #19d400
   - Cor secundária: #4700d4

