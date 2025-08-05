import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductForm from './components/ProductForm.jsx'
import ProductList from './components/ProductList.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [backendStatus, setBackendStatus] = useState('No probado')
  const [backendResponse, setBackendResponse] = useState('')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Función para probar la conectividad con el backend
  const testBackendConnection = async () => {
    setBackendStatus('Probando...')
    setBackendResponse('')
    
    try {
      // Probamos diferentes endpoints (usando tu backend local)
      const endpoints = [
        'http://localhost:3001/api/producto/',
        'http://localhost:3001/api/',
        'http://localhost:3001/',
        'https://backend-techstore.vercel.app/api/producto/',
        'https://backend-techstore.vercel.app/api/',
        'https://backend-techstore.vercel.app/'
      ]
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Probando endpoint: ${endpoint}`)
          
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            mode: 'cors'
          })
          
          console.log('Response status:', response.status)
          console.log('Response headers:', response.headers)
          
          if (response.ok) {
            const data = await response.text()
            setBackendStatus('✅ Conectado')
            setBackendResponse(`Endpoint: ${endpoint}\nStatus: ${response.status}\nData: ${data.substring(0, 200)}...`)
            return
          } else {
            console.log(`Error ${response.status} en ${endpoint}`)
          }
        } catch (error) {
          console.log(`Error en ${endpoint}:`, error.message)
        }
      }
      
      setBackendStatus('❌ Error de conexión')
      setBackendResponse('No se pudo conectar a ningún endpoint del backend')
      
    } catch (error) {
      console.error('Error general:', error)
      setBackendStatus('❌ Error')
      setBackendResponse(`Error: ${error.message}`)
    }
  }

  // Función para manejar cuando se crea un nuevo producto
  const handleProductCreated = (newProduct) => {
    console.log('Nuevo producto creado:', newProduct);
    // Incrementar el trigger para refrescar la lista
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TechStore - Gestión de Productos</h1>
      
      {/* Sección de prueba del backend */}
      <div className="card">
        <h3>Estado del Backend: {backendStatus}</h3>
        <button onClick={testBackendConnection} style={{ marginBottom: '10px' }}>
          Probar Conexión Backend
        </button>
        
        {backendResponse && (
          <div style={{ 
            textAlign: 'left', 
            backgroundColor: '#f0f0f0', 
            padding: '10px', 
            borderRadius: '5px',
            marginTop: '10px',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
            <strong>Respuesta:</strong><br/>
            {backendResponse}
          </div>
        )}
      </div>

      {/* Sección de gestión de productos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div className="card">
          <ProductForm onProductCreated={handleProductCreated} />
        </div>
        
        <div className="card">
          <ProductList refreshTrigger={refreshTrigger} />
        </div>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
