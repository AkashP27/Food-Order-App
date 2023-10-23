/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
import axios from "axios";

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		const response = await axios.post(
			"https://react-7da58-default-rtdb.firebaseio.com/orders.json",
			{
				user: userData,
				orderedItems: cartCtx.items,
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onCloseCart}>
				Close
			</button>
			{cartCtx.items.length > 0 && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
			</div>
			{isCheckout && (
				<Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />
			)}
			{!isCheckout && modalActions}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Successfully sent the order!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onCloseCart}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClose={props.onCloseCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
