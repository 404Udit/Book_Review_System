import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">BookReview</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/add-book" className="text-gray-700 hover:text-blue-600">Add Book</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
        { isLoggedIn && <button onClick={handleLogout} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Logout</button> }
        
        { !isLoggedIn && <><Link to="/login" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Login</Link>
        <Link to="/signup" className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">Signup</Link></>}
      </div>
    </nav>
  );
}
