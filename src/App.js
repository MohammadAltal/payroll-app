import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import EmployeeForm from './pages/Employees/Form';
import ListEmployees from './pages/Employees/List';
import SalariesOverview from './pages/Salaries/Overview';
import ListPayments from './pages/Salaries/ListPayments';
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AuthService from './services/AuthService';

function App() {
    const [redirectPath, setRedirectPath] = useState(null);
    const authService = new AuthService;
    const isAuthenticated = authService.isUserAuthenticated();

    useEffect(() => {
        if (!isAuthenticated) {
            // Redirect to Signin page if not authenticated
            setRedirectPath("/signin");
        } else {
            // Redirect to Home page if authenticated
            setRedirectPath("/home");
        }
    }, []);

    return (
        <div className="App">
            <main>
                <Router>
                    <Routes>
                        {redirectPath && <Route path="/" element={<Navigate to={redirectPath} />} />}
                        <Route path="/home" element={<Layout><ProtectedRoute element={Home} /></Layout>} />
                        <Route path="/employees" element={<Layout><ProtectedRoute element={ListEmployees} /></Layout>} />
                        <Route path="/employees/create" element={<Layout><ProtectedRoute element={EmployeeForm} /></Layout>} />
                        <Route path="/employees/:id" element={<Layout><ProtectedRoute element={EmployeeForm} /></Layout>} />
                        <Route path="/salaries" element={<Layout><ProtectedRoute element={SalariesOverview} /></Layout>} />
                        <Route path="/salaries/payments" element={<Layout><ProtectedRoute element={ListPayments} /></Layout>} />
                        <Route path="/signin" element={<PublicRoute element={Signin} />} />
                        <Route path="/signup" element={<PublicRoute element={Signup} />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
