import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductsContainer from './components/ProductsContainer';
import ProductDetailContainer from './components/ProductDetailContainer';
import NewProduct from './components/NewProduct';
import Carts from './components/Carts';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<ProductsContainer />} />
      <Route path='/products/:pid' element={<ProductDetailContainer />} />
      <Route path='/new_product' element={<NewProduct />} />
      <Route path='/carts' element={<Carts />} />
    </Routes>
  )
}

export default App
