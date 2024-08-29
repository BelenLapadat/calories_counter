import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, doc } from "firestorage";

function FoodsNew() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");

  const navigate = useNavigate();

  const createFood = () => {
    addDoc(doc("foodsList"), {
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
      <h1>New food</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createFood();
        }}
      >
        <label>
          Name
          <input
            placeholder="add name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Quantity per Serving
          <input
            placeholder="add quantity per serving"
            required
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </label>
        <label>
          Calories per Serving
          <input
            type="number"
            placeholder="add calories per serving"
            required
            value={calories}
            onChange={(e) => {
              setCalories(e.target.value);
            }}
          />
        </label>
        <button>Add</button>
      </form>
    </>
  );
}

export default FoodsNew;
