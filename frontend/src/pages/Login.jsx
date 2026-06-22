import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    console.log(res.data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "role",
      res.data.role
    );

    if (res.data.role === "ADMIN") {

      navigate("/admin-dashboard");

    }
    else {

      navigate("/employee-dashboard");

    }

  }
  catch (err) {

    console.log("ERROR:", err);

    alert("Invalid credentials");

  }

};

  return (
    <div className="container mt-5">

      <h2>Login</h2>

      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  );
}

export default Login;