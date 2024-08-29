import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Calories Counter</h1>
      <Link to="/today">
        <button>Today</button>
      </Link>
      <Link to="/foods">
        <button>Calories Table</button>
      </Link>
    </>
  );
}

export default Home;
