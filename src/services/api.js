// Configuración de la API
const API_BASE_URL = 'http://localhost:3001/api';

// Clase para manejar las peticiones HTTP
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método genérico para hacer peticiones
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Instancia del servicio
const apiService = new ApiService();

// Funciones específicas para productos
export const productService = {
  // Obtener todos los productos
  getAll: () => apiService.get('/producto/'),
  
  // Obtener un producto por ID
  getById: (id) => apiService.get(`/producto/${id}`),
  
  // Crear un nuevo producto
  create: (productData) => apiService.post('/producto/', productData),
  
  // Actualizar un producto
  update: (id, productData) => apiService.put(`/producto/${id}`, productData),
  
  // Eliminar un producto
  delete: (id) => apiService.delete(`/producto/${id}`),
};

// Exportar el servicio principal
export default apiService; 