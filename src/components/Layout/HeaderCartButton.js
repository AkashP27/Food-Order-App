import React,{ useContext , useEffect , useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import CartContext from '../../context/cart-context';
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const CartCtx = useContext(CartContext);

  const numberOfCartItems = CartCtx.items.reduce((accumulator, item)=>{
    return accumulator + item.amount;
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  const {items} = CartCtx;
  useEffect(() => {
   if (items.length === 0) {
    return;
   }
   setBtnIsHighlighted(true);
   const timer = setTimeout(() => {
    setBtnIsHighlighted(false);
   }, 300)

   return () => {
     clearTimeout(timer);
   }
  }, [items]);

  return (
   <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
     <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
   </button>
  );
}

export default HeaderCartButton