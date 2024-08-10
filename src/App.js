import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import CreateEmployee from './pages/Employees/Create';
import ListEmployees from './pages/Employees/List';
import Overview from './pages/Salaries/Overview';
function App() {
    return (
        <div className="App">
            <main>
                <Router>
                    <Routes>
                        <Route path="/employees" element={<Layout><ProtectedRoute element={ListEmployees} /></Layout>} />
                        <Route path="/employees/create" element={<Layout><ProtectedRoute element={CreateEmployee} /></Layout>} />
                        <Route path="/salaries" element={<Layout><ProtectedRoute element={Overview} /></Layout>} />
                        <Route path="/signin" element={<PublicRoute element={Signin} />} />
                        <Route path="/signup" element={<PublicRoute element={Signup} />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
