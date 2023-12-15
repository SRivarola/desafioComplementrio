import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductsContainer from './pages/ProductsContainer';
import ProductDetailContainer from './pages/ProductDetailContainer';
import ManageProducts from './pages/ManageProducts';
import Carts from './pages/Carts';
import Auth from './pages/Auth';
import NavBar from './components/NavBar';
import AuthContextProvider from './context/authContext';
import Premium from './pages/Premium';
import RecoverPass from './pages/RecoverPass';
import NewPassword from './pages/NewPassword';
import Checkout from './pages/Checkout';
import CartContextProvider from './context/cartContext';

function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/products' element={<ProductsContainer />} />
          <Route path='/products/:pid' element={<ProductDetailContainer />} />
          <Route path='/new_product' element={<ManageProducts />} />
          <Route path='/premium' element={<Premium />} />
          <Route path='/forgot_pass' element={<RecoverPass />} />
          <Route path='/recover_pass/:token' element={<NewPassword />} />
          <Route path='/carts' element={<Carts />} />
          <Route path='/checkout/:oid' element={<Checkout />} />
        </Routes>
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default App
