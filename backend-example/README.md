# Backend TechStore API

API REST para la gestión de productos de TechStore.

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en desarrollo:**
```bash
npm run dev
```

3. **Ejecutar en producción:**
```bash
npm start
```

## Endpoints disponibles

### Productos

- **GET** `/api/producto` - Obtener todos los productos
- **GET** `/api/producto/:id` - Obtener un producto por ID
- **POST** `/api/producto` - Crear un nuevo producto
- **PUT** `/api/producto/:id` - Actualizar un producto
- **DELETE** `/api/producto/:id` - Eliminar un producto

### Ejemplo de uso

#### Crear un producto
```bash
curl -X POST http://localhost:3001/api/producto \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop Gaming",
    "descripcion": "Laptop para gaming de alto rendimiento",
    "precio": 1200.00,
    "stock": 10,
    "categoria": "Electrónicos"
  }'
```

#### Obtener todos los productos
```bash
curl http://localhost:3001/api/producto
```

## Configuración CORS

El servidor está configurado para aceptar peticiones desde:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)
- `https://frontend-techstore.vercel.app` (Frontend en producción)

## Estructura del proyecto

```
backend-example/
├── app.js              # Archivo principal del servidor
├── routes/
│   └── producto.js     # Rutas para productos
├── package.json        # Dependencias y scripts
└── README.md          # Este archivo
```

## Variables de entorno

- `PORT`: Puerto del servidor (por defecto: 3001)
- `NODE_ENV`: Entorno de ejecución (development/production) 