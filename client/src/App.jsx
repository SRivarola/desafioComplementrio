import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import ProductsContainer from './components/ProductsContainer';

function App() {
  
  return (
    <Routes>
      <Route path='/products' element={<ProductsContainer />} />
    </Routes>
  )
}

export default App
