import React,{useState} from 'react'
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from './context/CartProvider';

const App = () => {
  const [CartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
   <CartProvider>
    <Header onShowCart={showCartHandler} />
    {CartIsShown && <Cart onCloseCart={hideCartHandler} />}
    <main>
     <Meals />
    </main>
   </CartProvider>
  );
}

export default App;
