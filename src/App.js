import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home"; // Import your Home component
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
    return (
        <div className="App">
            <main>
                <Router>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute element={Home} />} />
                        <Route path="/home" element={<ProtectedRoute element={Home} />} />
                        <Route path="/signin" element={<PublicRoute element={Signin} />} />
                        <Route path="/signup" element={<PublicRoute element={Signup} />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
