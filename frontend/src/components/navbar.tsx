import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav>
            {/* <Link to="/">Home</Link> */}
            {isAuthenticated && (
                <>
                    <Link to="/tasks">Tasks</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
