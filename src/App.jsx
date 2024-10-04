import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NavBar from "../components/Header";
import WeatherPage from "./pages/weatherPage/WeatherPage";
import GoogleBooksPage from "./pages/googleBooksPage/googleBooksPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route>
            <Route path="/weather" element={<WeatherPage />} />
          </Route>
          <Route>
            <Route path="/googlebooks" element={<GoogleBooksPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
