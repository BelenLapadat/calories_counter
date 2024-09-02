import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Today from "./pages/Today";
import Week from "./pages/Week";
import Foods from "./pages/Foods";
import FoodsNew from "./pages/FoodsNew";
import FoodsEdit from "./pages/FoodsEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="today" element={<Today />} />
        <Route path="week" element={<Week />} />
        <Route path="foods" element={<Foods />} />
        <Route path="foods/new" element={<FoodsNew />} />
        <Route path="foods/edit/:id" element={<FoodsEdit />} />
      </Routes>
    </div>
  );
}

export default App;
