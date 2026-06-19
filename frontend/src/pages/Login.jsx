import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

  try {

    const response = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    console.log(response.data);

    localStorage.setItem(
      "token",
      response.data.token
    );

    navigate("/dashboard");

  } catch (error) {

    console.log("ERROR:", error);
    console.log(error.response);

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