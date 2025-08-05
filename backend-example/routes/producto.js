const express = require('express');
const router = express.Router();

// Array temporal para almacenar productos (en producción usarías una base de datos)
let productos = [
  {
    id: 1,
    nombre: "Laptop Gaming",
    descripcion: "Laptop para gaming de alto rendimiento",
    precio: 1200.00,
    stock: 10,
    categoria: "Electrónicos"
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico",
    descripcion: "Mouse inalámbrico ergonómico",
    precio: 45.99,
    stock: 25,
    categoria: "Accesorios"
  }
];

// GET /api/producto - Obtener todos los productos
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: productos,
      message: 'Productos obtenidos exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
});

// GET /api/producto/:id - Obtener un producto por ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: producto,
      message: 'Producto encontrado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      error: error.message
    });
  }
});

// POST /api/producto - Crear un nuevo producto
router.post('/', (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    
    // Validaciones básicas
    if (!nombre || !descripcion || !precio || !stock || !categoria) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }
    
    // Generar nuevo ID
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

// PUT /api/producto/:id - Actualizar un producto
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    
    const index = productos.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    // Actualizar el producto
    productos[index] = {
      ...productos[index],
      nombre: nombre || productos[index].nombre,
      descripcion: descripcion || productos[index].descripcion,
      precio: precio ? parseFloat(precio) : productos[index].precio,
      stock: stock ? parseInt(stock) : productos[index].stock,
      categoria: categoria || productos[index].categoria,
      fechaActualizacion: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: productos[index],
      message: 'Producto actualizado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el producto',
      error: error.message
    });
  }
});

// DELETE /api/producto/:id - Eliminar un producto
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    const productoEliminado = productos.splice(index, 1)[0];
    
    res.json({
      success: true,
      data: productoEliminado,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el producto',
      error: error.message
    });
  }
});

module.exports = router; 