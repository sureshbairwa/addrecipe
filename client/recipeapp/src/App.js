
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Homepage} from "./pages/homepage.js"
import {Auth} from "./pages/auth.js"
import {CreateRecipes} from "./pages/createrecipes.js"
import {SavedRecipes} from "./pages/savedrecipes.js"
import { Navigationbar } from "./components/navigationbar.js";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/create-recipes" element={<CreateRecipes/>} />
          <Route path="/saved-recipes" element={<SavedRecipes/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
