import { useEffect } from 'react';
import axios from 'axios'

function App() {
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        console.log(res.data)
      })
  }, []);

  return (
    <div>
        hola  
    </div>
  )
}

export default App
