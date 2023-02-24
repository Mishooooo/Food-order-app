import Card from "../UI/Card";
import classes from "./MealList.module.css";
import Meal from "./MealsItem/MealItem.js";

const dummyMeals = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
  {
    id: "m5",
    name: "Khinkhali",
    description: "Healthy...and delicious...",
    price: 1.99,
  },
];

const MealsList = function () {
  return (
    <section className={classes.meals}>
      <Card  >
        <ul>
          {dummyMeals.map((item) => (
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
    </section>
  );
};

export default MealsList;
