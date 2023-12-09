import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductsContainer from './pages/ProductsContainer';
import ProductDetailContainer from './pages/ProductDetailContainer';
import NewProduct from './pages/NewProduct';
import Carts from './pages/Carts';
import Auth from './pages/Auth';
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
