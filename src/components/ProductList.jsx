import { useState, useEffect } from 'react';
import { productService } from '../services/api.js';

const ProductList = ({ refreshTrigger }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setError('');
    } catch (error) {
      console.error('Error al obtener productos:', error);
      setError('Error al cargar los productos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await productService.delete(id);
        // Recargar la lista después de eliminar
        fetchProducts();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  if (loading) {
    return (
      <div className="product-list">
        <h3>Lista de Productos</h3>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list">
        <h3>Lista de Productos</h3>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchProducts}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h3>Lista de Productos ({products.length})</h3>
      
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <div className="products-grid" style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
          {products.map((product) => (
            <div 
              key={product._id || product.id} 
              className="product-card"
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h4>{product.nombre}</h4>
              <p><strong>Descripción:</strong> {product.descripcion}</p>
              <p><strong>Precio:</strong> ${product.precio}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Categoría:</strong> {product.categoria}</p>
              
              <div className="product-actions" style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => handleDelete(product._id || product.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  Eliminar
                </button>
                <button 
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 