const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/producto');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://frontend-techstore.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API TechStore funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      productos: '/api/producto',
      productos_individual: '/api/producto/:id'
    }
  });
});

// Rutas de la API
app.use('/api/producto', productoRoutes);

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Middleware para manejar errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
  console.log(`API disponible en: http://localhost:${PORT}`);
  console.log(`Documentación: http://localhost:${PORT}/`);
});

module.exports = app; 