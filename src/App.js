import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

function App() {
  return (
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/home" element={<App />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
