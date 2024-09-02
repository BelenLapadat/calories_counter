import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firestorage";

function Today() {
  //states
  const [foodsList, setFoodsList] = useState([]);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [todayFoods, setTodayFoods] = useState([]);

  const navigate = useNavigate();

  //load page with
  useEffect(() => {
    const foodList = getDocs(doc("foodsList")).data();
    setFoodsList(foodList);

    const todayFoods = getDocs(doc("todayFoods")).data();
    setTodayFoods(todayFoods);
  }, []);

  //select a food and update the states
  const addSelectedFood = () => {
    const foodRef = doc("foodsList", selectedFoodId);
    const chosenFood = getDoc(foodRef).data();
    chosenFood.servings = 1;
    addDoc(doc("todayFoods"), chosenFood);
    setTodayFoods([...todayFoods, chosenFood]);
  };

  //delete a food and clean the state
  const deleteFood = (food) => {
    deleteDoc(doc("todayFoods", food.id));

    const newArray = todayFoods.filter((f) => f.id !== food.id);
    setTodayFoods(newArray);
  };

  //sum calories per food
  const calculateFoodCalories = (food) => {
    return food.calories * food.servings;
  };

  //handle the serving state food by food
  const handleServingChange = (foodId, newServing) => {
    setTodayFoods((todayFoods) => {
      return todayFoods.map((food) => {
        if (food.id == foodId) {
          return { ...food, servings: newServing };
        } else {
          return food;
        }
      });
    });
  };

  let totalCalories = 0;

  todayFoods.forEach((food) => {
    totalCalories += food.calories * food.servings;
  });

  //must check if theres a doc for the day, if it is update if not add it
  const saveDay = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const existingDays = getDocs(doc("daysList")).data();
    //STEP 1 : find out if there is a day for the current day in the database

    let todayExist = false;
    let dayObj = null;

    existingDays.forEach((day) => {
      if (day.date === currentDate) {
        todayExist = true;
        dayObj = day;
      }
    });

    //STEP 2 : if there is a day in the database update it otherwise create it

    if (todayExist) {
      updateDoc(doc("daysList", dayObj.id), {
        calories: totalCalories,
      });
    } else {
      addDoc(doc("daysList"), {
        date: currentDate,
        calories: totalCalories,
      });
    }

    console.log(existingDays);

    navigate("/week");
  };

  return (
    <>
      <h1>Today</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSelectedFood();
        }}
      >
        <label>
          <h3>Add Food</h3>
          <select
            onChange={(e) => {
              setSelectedFoodId(e.target.value);
            }}
          >
            <option key="select" value="">
              Select
            </option>
            {foodsList.map((food) => {
              return (
                <>
                  <option key={food.id} value={food.id}>
                    {food.name}
                  </option>
                </>
              );
            })}
          </select>
        </label>
        <button>+</button>
      </form>
      <h3>Today&apos;s Count</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Servings</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todayFoods.map((food) => {
            return (
              <>
                <tr key={food.id}>
                  <td>{food.name}</td>
                  <td>{calculateFoodCalories(food)}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={food.servings}
                      onChange={(e) => {
                        handleServingChange(food.id, +e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteFood(food);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <span>Today you have consumed {totalCalories}kcal</span>
      <button
        onClick={() => {
          saveDay();
        }}
      >
        Save
      </button>
    </>
  );
}

export default Today;
