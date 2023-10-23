import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveCharacters = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const isValidEnteredName = isNotEmpty(enteredName);
		const isValidenteredStreet = isNotEmpty(enteredStreet);
		const isValidenteredPostalCode = isFiveCharacters(enteredPostalCode);
		const isValidEnteredCity = isNotEmpty(enteredCity);

		const isFormValid =
			isValidEnteredName &&
			isValidenteredStreet &&
			isValidenteredPostalCode &&
			isValidEnteredCity;

		setFormInputValidity({
			name: isValidEnteredName,
			street: isValidenteredStreet,
			postalCode: isValidenteredPostalCode,
			city: isValidEnteredCity,
		});

		if (!isFormValid) {
			return;
		}

		props.onConfirm({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		});
	};

	return (
		<form onSubmit={confirmHandler}>
			<div
				className={`${classes.control} ${
					formInputValidity.name ? "" : classes.invalid
				}`}
			>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputValidity.name && <p>Please enter Valid name!</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputValidity.street ? "" : classes.invalid
				}`}
			>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputValidity.street && <p>Please enter Valid street!</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputValidity.postalCode ? "" : classes.invalid
				}`}
			>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalCodeInputRef} />
				{!formInputValidity.postalCode && (
					<p>Please enter Valid postal code!</p>
				)}
			</div>
			<div
				className={`${classes.control} ${
					formInputValidity.city ? "" : classes.invalid
				}`}
			>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputValidity.city && <p>Please enter Valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
