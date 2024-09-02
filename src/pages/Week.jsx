import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs, doc } from "firestorage";

function Week() {
  const [daysList, setDaysList] = useState([]);

  useEffect(() => {
    const list = getDocs(doc("daysList")).data();
    setDaysList(list);
  }, []);

  let weekCalories = 0;
  daysList.forEach((day) => {
    weekCalories += day.calories;
  });

  return (
    <>
      <h1>Week</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <h2>Days</h2>
      <ul>
        {daysList.map((day) => {
          return (
            <>
              <li key={day.id}>
                {day.date}
                ..............
                {day.calories}kcal
              </li>
            </>
          );
        })}
      </ul>
      <span>This week you have consumed {weekCalories}kcal</span>
    </>
  );
}

export default Week;
