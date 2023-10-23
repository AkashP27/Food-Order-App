import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import axios from "axios";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const getMeals = async () => {
			const response = await axios.get(
				"https://react-7da58-default-rtdb.firebaseio.com/meals.json"
			);

			if (!response.statusCode === 200) {
				throw new Error("Something went wrong");
			}

			// const responseData = response.json();
			const loadMeals = [];
			for (const key in response.data) {
				loadMeals.push({
					id: key,
					name: response.data[key].name,
					description: response.data[key].description,
					price: response.data[key].price,
				});
			}
			// console.log(response.data);

			setIsLoading(false);
			setMeals(loadMeals);
		};

		getMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.MealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>
					{meals.map((meal) => {
						return (
							<MealItem
								key={meal.id}
								id={meal.id}
								name={meal.name}
								description={meal.description}
								price={meal.price}
							/>
						);
					})}
				</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
