import { useState } from "react";
import { signupUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signupUser(form);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setMessage("Signup successful ✅, Redirecting to Login Page");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(data.message || "Signup failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>
        <input name="name" placeholder="Full Name" onChange={handleChange}
          className="w-full mb-4 p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange}
          className="w-full mb-4 p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}
          className="w-full mb-6 p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
}
