import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Tasks from "./pages/tasks";
import PrivateRoute from "./routes/privateRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;
