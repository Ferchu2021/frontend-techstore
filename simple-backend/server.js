const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Datos de ejemplo
let productos = [
  {
    id: 1,
    nombre: "Laptop Gaming Pro",
    descripcion: "Laptop de alto rendimiento para gaming",
    precio: 1299.99,
    categoria: "Laptops",
    stock: 15
  },
  {
    id: 2,
    nombre: "Monitor 4K Ultra HD",
    descripcion: "Monitor de 27\" con resolución 4K",
    precio: 599.99,
    categoria: "Monitores",
    stock: 8
  }
];

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Backend TechStore funcionando',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// GET /api/producto - Obtener todos los productos
app.get('/api/producto', (req, res) => {
  try {
    res.json({
      success: true,
      data: productos,
      message: 'Productos obtenidos exitosamente',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

// POST /api/producto - Crear un nuevo producto
app.post('/api/producto', (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    
    if (!nombre || !descripcion || !precio || !stock || !categoria) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }
    
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    
    const nuevoProducto = {
      id: nuevoId,
      nombre,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      categoria,
      fechaCreacion: new Date().toISOString()
    };
    
    productos.push(nuevoProducto);
    
    res.status(201).json({
      success: true,
      data: nuevoProducto,
      message: 'Producto creado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el producto',
      error: error.message
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api/producto`);
  console.log(`✅ CORS configurado para frontend`);
}); 