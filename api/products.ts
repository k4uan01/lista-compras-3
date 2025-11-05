import { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Exemplo de API de produtos
 * GET /api/products - Lista todos os produtos
 * POST /api/products - Cria um novo produto
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET - Listar produtos
  if (req.method === 'GET') {
    // Aqui você pode conectar com Supabase ou outro banco
    const products = [
      { id: 1, name: 'Produto 1', price: 10.50 },
      { id: 2, name: 'Produto 2', price: 20.00 },
    ];
    
    return res.status(200).json({ 
      success: true,
      data: products,
      count: products.length
    });
  }

  // POST - Criar produto
  if (req.method === 'POST') {
    const { name, price } = req.body;
    
    // Validação simples
    if (!name || !price) {
      return res.status(400).json({ 
        success: false,
        error: 'Nome e preço são obrigatórios' 
      });
    }
    
    // Aqui você salvaria no banco
    const newProduct = { 
      id: Date.now(), 
      name, 
      price: parseFloat(price) 
    };
    
    return res.status(201).json({ 
      success: true,
      data: newProduct,
      message: 'Produto criado com sucesso!'
    });
  }

  // Método não permitido
  return res.status(405).json({ 
    success: false,
    error: 'Método não permitido' 
  });
}

