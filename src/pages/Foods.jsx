import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, doc, deleteDoc } from "firestorage";

function Foods() {
  const [foodsList, setFoodsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const list = getDocs(doc("foodsList")).data();
    setFoodsList(list);
  }, []);

  const deleteFood = (food) => {
    deleteDoc(doc("foodsList", food.id));

    const updatedFoodList = foodsList.filter((f) => f.id !== food.id);
    setFoodsList(updatedFoodList);
  };

  //add a searcher

  return (
    <>
      <h1>Calories Table</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Serving Size</th>
            <th>Calories per Serving</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foodsList.map((food) => {
            return (
              <tr key={food.id}>
                <td>{food.name}</td>
                <td>{food.quantity}</td>
                <td>{food.calories} kcal</td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/foods/edit/${food.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteFood(food);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/foods/new">
        <button>Add</button>
      </Link>
    </>
  );
}

export default Foods;
