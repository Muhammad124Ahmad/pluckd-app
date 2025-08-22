import { React, useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const { password, setPassword } = useState("");
  const [email, setEmail] = useState("");

  function handleLogin() {
    console.log("Temp Login message");
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Login</h2>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="text"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="btn btn-primary w-100 mb-3"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            <p className="mt-4 text-center">
              New here?{" "}
              <a href="/app/register" className="text-primary">
                Register Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage