import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import CreateEmployee from './pages/Employees/Create';
import IndexEmployees from './pages/Employees/Index';

function App() {
    return (
        <div className="App">
            <main>
                <Router>
                    <Routes>

                        <Route path="/employees" element={<Layout><ProtectedRoute element={IndexEmployees} /></Layout>} />
                        <Route path="/home" element={<Layout><ProtectedRoute element={CreateEmployee} /></Layout>} />

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
