import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './HomePage.css';

interface Product {
  id: string;
  name: string;
  amount: number;
  amount_type: string;
  price: number;
  image: string | null;
  added_cart: boolean;
}

interface ProductsResponse {
  status: boolean;
  message: string;
  data: Product[];
  pagination: {
    current_page: number;
    total_items: number;
    total_pages: number;
  };
}

export default function HomePage() {
  const navigate = useNavigate();
  const [jwt, setJwt] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          navigate('/login');
          return;
        }

        setJwt(session.access_token);
      } catch (err) {
        console.error('Erro ao obter sessão:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, [navigate]);

  const fetchProducts = async (page: number = 1) => {
    if (!jwt) return;

    setLoadingProducts(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-products`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p_current_page: page.toString(),
            p_items_page: itemsPerPage.toString(),
          }),
        }
      );

      const result: ProductsResponse = await response.json();

      if (result.status) {
        setProducts(result.data);
        setCurrentPage(result.pagination.current_page);
        setTotalPages(result.pagination.total_pages);
        setTotalItems(result.pagination.total_items);
      } else {
        console.error('Erro ao buscar produtos:', result.message);
      }
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (jwt) {
      fetchProducts(currentPage);
    }
  }, [jwt]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchProducts(newPage);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const toggleCart = async (productId: string) => {
    if (!jwt) return;

    // Atualização otimista - muda o estado imediatamente
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, added_cart: !product.added_cart }
          : product
      )
    );

    // Chama a API em background
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/post-add-or-remove-cart`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p_product_id: productId,
          }),
        }
      );

      const result = await response.json();

      // Se falhar, reverte a mudança
      if (!result.status) {
        console.error('Erro ao atualizar carrinho:', result.message);
        setProducts(prevProducts =>
          prevProducts.map(product =>
            product.id === productId
              ? { ...product, added_cart: !product.added_cart }
              : product
          )
        );
      }
    } catch (err) {
      console.error('Erro ao atualizar carrinho:', err);
      // Reverte a mudança em caso de erro
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId
            ? { ...product, added_cart: !product.added_cart }
            : product
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <h1>Lista de Compras</h1>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </header>

        <div className="quick-actions">
          <button 
            onClick={() => navigate('/products/create')}
            className="add-product-button"
          >
            <span className="button-icon">➕</span>
            <span className="button-title">Adicionar Produto</span>
          </button>
        </div>

        <div className="products-section">
          <div className="products-header">
            <h3>📦 Meus Produtos</h3>
            <p className="products-count">
              {totalItems > 0 ? `${totalItems} produto${totalItems !== 1 ? 's' : ''} cadastrado${totalItems !== 1 ? 's' : ''}` : 'Nenhum produto cadastrado'}
            </p>
          </div>

          {loadingProducts ? (
            <div className="products-loading">
              <div className="spinner"></div>
              <p>Carregando produtos...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="products-list">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    {product.image && (
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                    )}
                    <div className="product-body">
                      <div className="product-header">
                        <h4 className="product-name">{product.name}</h4>
                      </div>
                      <div className="product-details">
                        <div className="product-info">
                          <span className="product-amount">
                            {product.amount} {product.amount_type}
                          </span>
                          <span className="product-price">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <label className="cart-checkbox" title={product.added_cart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}>
                          <input
                            type="checkbox"
                            checked={product.added_cart}
                            onChange={() => toggleCart(product.id)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    ← Anterior
                  </button>
                  
                  <div className="pagination-info">
                    <span>Página {currentPage} de {totalPages}</span>
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                  >
                    Próxima →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-products">
              <span className="empty-icon">📦</span>
              <h4>Nenhum produto encontrado</h4>
              <p>Comece adicionando seu primeiro produto à lista!</p>
              <button 
                onClick={() => navigate('/products/create')}
                className="empty-action-button"
              >
                ➕ Adicionar Primeiro Produto
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

