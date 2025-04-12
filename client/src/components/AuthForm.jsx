// src/components/AuthForm.jsx
import { useState } from "react";
import axios from "axios";

export default function AuthForm({ setToken, setUsername }) {
  const [formType, setFormType] = useState("login");
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `https://task-tracker-a5fa.onrender.com/api/auth/${formType}`;
      const res = await axios.post(url, { username, password });

      if (formType === "signup") {
        // After signup, automatically switch to login and trigger it
        const loginRes = await axios.post(
          "https://task-tracker-a5fa.onrender.com/api/auth/login",
          {
            username,
            password,
          }
        );

        if (loginRes.data.token) {
          setToken(loginRes.data.token);
          setUsername(loginRes.data.username);
          localStorage.setItem("token", loginRes.data.token);
          localStorage.setItem("username", loginRes.data.username);
        }
      } else {
        if (res.data.token) {
          setToken(res.data.token);
          setUsername(res.data.username);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
        }
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-80 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4 capitalize">
          {formType}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-colors"
          >
            {formType}
          </button>
        </form>
        {error && (
          <p className="text-red-600 mt-2 text-sm text-center">{error}</p>
        )}
        <p className="mt-4 text-center text-sm">
          {formType === "login" ? "Don't have an account?" : "Already a user?"}{" "}
          <span
            onClick={() =>
              setFormType(formType === "login" ? "signup" : "login")
            }
            className="text-blue-500 font-medium hover:underline cursor-pointer"
          >
            {formType === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
