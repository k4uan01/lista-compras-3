import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './EditProductPage.css';

// Types para a API
interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T | null;
}

interface ProductData {
  id: string;
  name: string;
  amount: number;
  amount_type: string;
  price: number;
  observations: string | null;
  image: string | null;
  added_cart: boolean;
  created_at: string;
}

const AMOUNT_TYPES = [
  { value: 'unit', label: 'Unidade (un)' },
];

export default function EditProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amountType, setAmountType] = useState('unit');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Buscar produto ao montar o componente
  useEffect(() => {
    if (!productId) {
      setError('ID do produto não fornecido');
      setLoadingProduct(false);
      return;
    }

    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id: string) => {
    try {
      setLoadingProduct(true);
      setError('');

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Usuário não autenticado');
      }

      // Chamar a função do Supabase diretamente
      const { data, error: rpcError } = await supabase
        .rpc('get_product', { p_product_id: id });

      if (rpcError) {
        throw new Error(`Erro ao buscar produto: ${rpcError.message}`);
      }

      const result = data as ApiResponse<ProductData>;

      if (!result.status || !result.data) {
        throw new Error(result.message || 'Produto não encontrado');
      }

      const product = result.data;

      // Preencher o formulário com os dados do produto
      setName(product.name);
      setQuantity(product.amount.toString());
      setAmountType(product.amount_type);
      setPrice(product.price.toString());
      setNotes(product.observations || '');
      
      if (product.image) {
        setCurrentImageUrl(product.image);
        setImagePreview(product.image);
      }

    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao buscar produto';
      setError(errorMessage);
      console.error('❌ Erro ao buscar produto:', err);
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione uma imagem válida');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }

      setImage(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
    setCurrentImageUrl(null);
  };

  const uploadImageToStorage = async (file: File): Promise<string | null> => {
    try {
      // Gerar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      console.log('📤 Fazendo upload da imagem:', filePath);

      // Upload para o bucket 'images'
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('❌ Erro ao fazer upload da imagem:', error);
        throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
      }

      console.log('✅ Upload realizado:', data.path);

      // Obter URL pública da imagem
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(data.path);

      console.log('🔗 URL pública da imagem:', publicUrlData.publicUrl);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('❌ Erro no uploadImageToStorage:', error);
      throw error;
    }
  };

  const callEditProductFunction = async (
    productData: {
      p_product_id: string;
      p_name: string;
      p_amount: number;
      p_amount_type: string;
      p_price: number;
      p_observations?: string | null;
      p_image?: string | null;
    }
  ): Promise<ApiResponse> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Usuário não autenticado');
      }

      console.log('📡 Chamando função de edição');
      console.log('📦 Dados do produto:', productData);

      // Chamar a função do Supabase diretamente
      const { data, error: rpcError } = await supabase
        .rpc('post_edit_product', productData);

      if (rpcError) {
        throw new Error(`Erro ao editar produto: ${rpcError.message}`);
      }

      const result = data as ApiResponse;

      console.log('📬 Resposta da função:', result);

      if (!result.status) {
        throw new Error(result.message || 'Erro ao editar produto');
      }

      return result;
    } catch (error) {
      console.error('❌ Erro ao chamar função de edição:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!productId) {
      setError('ID do produto não encontrado');
      return;
    }

    // Validações
    if (!name.trim()) {
      setError('Por favor, preencha o nome do produto');
      return;
    }

    if (name.trim().length > 255) {
      setError('O nome do produto não pode ter mais de 255 caracteres');
      return;
    }

    if (!quantity || parseInt(quantity) <= 0) {
      setError('Por favor, informe uma quantidade válida');
      return;
    }

    if (!price || parseFloat(price) < 0) {
      setError('Por favor, informe um preço válido');
      return;
    }

    if (notes.length > 1000) {
      setError('As observações não podem ter mais de 1000 caracteres');
      return;
    }

    setLoading(true);

    try {
      let imageUrl: string | null = currentImageUrl;

      // Se houver uma nova imagem, fazer upload
      if (image) {
        console.log('📤 Iniciando upload da nova imagem...');
        imageUrl = await uploadImageToStorage(image);
        console.log('✅ Nova imagem enviada com sucesso!');
      } else if (!imagePreview && currentImageUrl) {
        // Se a imagem foi removida, definir como null
        imageUrl = null;
      }

      // Preparar dados do produto
      const productData = {
        p_product_id: productId,
        p_name: name.trim(),
        p_amount: parseInt(quantity),
        p_amount_type: amountType,
        p_price: parseFloat(price),
        p_observations: notes.trim() || null,
        p_image: imageUrl,
      };

      // Chamar função para editar o produto
      console.log('🚀 Editando produto...');
      const result = await callEditProductFunction(productData);

      console.log('✅ Produto editado:', result.data);
      setSuccess('Produto atualizado com sucesso!');
      
      // Redirecionar após sucesso
      setTimeout(() => {
        navigate('/home');
      }, 1500);

    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao atualizar produto. Tente novamente.';
      setError(errorMessage);
      console.error('❌ Erro completo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loadingProduct) {
    return (
      <div className="edit-product-container">
        <div className="edit-product-card">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Carregando produto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!productId) {
    return (
      <div className="edit-product-container">
        <div className="edit-product-card">
          <div className="error-state">
            <h2>Produto não encontrado</h2>
            <button onClick={() => navigate('/home')} className="back-button">
              Voltar para Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-container">
      <div className="edit-product-card">
        <div className="page-header">
          <h1>Editar Produto</h1>
          <p className="subtitle">Altere os dados do produto conforme necessário</p>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="name">
                Nome do Produto <span className="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ex: Arroz, Feijão, Maçã..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
                maxLength={100}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">
                Quantidade <span className="required">*</span>
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={loading}
                required
                min="1"
                max="32767"
              />
            </div>

            <div className="form-group">
              <label htmlFor="amountType">
                Unidade <span className="required">*</span>
              </label>
              <select
                id="amountType"
                value={amountType}
                onChange={(e) => setAmountType(e.target.value)}
                disabled={loading}
                required
              >
                {AMOUNT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="price">
                Preço (R$) <span className="required">*</span>
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={loading}
                required
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="notes">Observações</label>
              <textarea
                id="notes"
                placeholder="Adicione observações sobre o produto (opcional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
                rows={4}
                maxLength={1000}
              />
              <span className="char-count">{notes.length}/1000</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="image">Imagem do Produto</label>
              
              {!imagePreview ? (
                <div className="image-upload-area">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                    className="image-input"
                  />
                  <label htmlFor="image" className="image-upload-label">
                    <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Clique para adicionar uma imagem</span>
                    <span className="image-hint">PNG, JPG ou WEBP (máx. 5MB)</span>
                  </label>
                </div>
              ) : (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-image-button"
                    disabled={loading}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

