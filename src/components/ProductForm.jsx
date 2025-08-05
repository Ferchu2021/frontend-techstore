import { useState } from 'react';
import { productService } from '../services/api.js';

const ProductForm = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convertir precio y stock a números
      const productData = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      };

      const newProduct = await productService.create(productData);
      console.log('Producto creado:', newProduct);
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: ''
      });

      // Notificar al componente padre
      if (onProductCreated) {
        onProductCreated(newProduct);
      }

    } catch (error) {
      console.error('Error al crear producto:', error);
      setError('Error al crear el producto. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form">
      <h3>Crear Nuevo Producto</h3>
      
      {error && (
        <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            min="0"
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm; 