import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firestorage";

function FoodsEdit() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const food = getDoc(doc("foodsList", params.id)).data();
    setName(food.name);
    setQuantity(food.quantity);
    setCalories(food.calories);
  }, [params.id]);

  const editFood = (name, quantity, calories) => {
    updateDoc(doc("foodsList", params.id), {
      name: name,
      quantity: quantity,
      calories: calories,
    });
    navigate("/foods");
  };

  return (
    <>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/foods">
        <button>Back</button>
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editFood(name, quantity, calories);
        }}
      >
        <label>
          Name
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Quantity per Serving
          <input
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </label>
        <label>
          Calories per Serving
          <input
            value={calories}
            onChange={(e) => {
              setCalories(e.target.value);
            }}
          />
        </label>
        <button>Save</button>
      </form>
    </>
  );
}

export default FoodsEdit;
