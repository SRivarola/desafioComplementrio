import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductsContainer from './components/ProductsContainer';
import ProductDetailContainer from './components/ProductDetailContainer';
import NewProduct from './components/NewProduct';
import Carts from './components/Carts';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import AuthContextProvider from './context/authContext';
import Premium from './pages/Premium';
import RecoverPass from './pages/RecoverPass';
import NewPassword from './pages/NewPassword';

function App() {
  return (
    <AuthContextProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/products' element={<ProductsContainer />} />
        <Route path='/products/:pid' element={<ProductDetailContainer />} />
        <Route path='/new_product' element={<NewProduct />} />
        <Route path='/premium' element={<Premium />} />
        <Route path='/forgot_pass' element={<RecoverPass />} />
        <Route path='/recover_pass/:token' element={<NewPassword />} />
        <Route path='/carts' element={<Carts />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
