import { Route, Routes } from "react-router-dom";
import "../src/styles/main.scss";
import Layout from "./components/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
