import { useEffect, useState } from "react";
import Card from "../UI/Card";
import SpinnerIcon from "../UI/SpinnerIcon";
import classes from "./MealList.module.css";
import Meal from "./MealsItem/MealItem.js";

const MealsList = function () {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);

  let loadedMeals = [];

  useEffect(() => {
    setIsLoading(true);

    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-1c03e-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();
       

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMeals(loadedMeals);

        setIsLoading(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <section className={classes.meals}>
      {!isLoading ? (   !httpError ? (
        <Card>
       
            <ul>
              {meals.map((item) => (
                <Meal
                  id={item.id}
                  key={item.id}
                  foodName={item.name}
                  foodDescription={item.description}
                  foodPrice={item.price}
                />
              ))}
            </ul>
       
        </Card>
      ) : (
        <p className={classes.MealsError}>{httpError}</p>
      )     ) : (
            <SpinnerIcon />
          )}
    </section>
  );
};

export default MealsList;
