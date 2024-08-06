import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Home from "./pages/home"; // Import your Home component
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
    return (
        <div className="App">
            <main>
                <Router>
                    <Routes>
                        <Route path="/home" element={<ProtectedRoute element={Home} />} />
                        <Route path="/signin" element={<PublicRoute element={SignIn} />} />
                        <Route path="/signup" element={<PublicRoute element={SignUp} />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
