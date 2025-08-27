import { useState } from "react";
//Step 1 - Task 1
import { urlConfig } from "../../config";

//Step 1 - Task 2
import { useAppContext } from "../../context/AuthContext";

//Step 1 - Task 3
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Step 1 - Task 4
  const [showerr, setShowerr] = useState("");

  //Step 1 - Task 5
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleRegister = async () => {
    const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
      //Step 1 - Task 6
      method: "POST",
      //Step 1 - Task 7
      headers: {
        "content-type": "application/json",
      },
      //Step 1 - Task 8
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });

    //Step 2 - Task 1
    const json = await response.json();
    console.log("json data", json);
    console.log("er", json.error);

    //Step 2 - Task 2
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", firstName);
      sessionStorage.setItem("email", json.email);
      //Step 2 - Task 3
      setIsLoggedIn(true);
      //Step 2 - Task 4
      navigate("/app");
    }
    if (json.error) {
      setShowerr(json.error);
    }
    if (json.errors) {
      if (json.errors[0]) {
        if (json.errors[0]["path"] === "password") {
          setShowerr("Lenght of password should be atleast 6 digits");
        } else if (
          json.errors[0]["path"] === "firstName" ||
          json.errors[0]["path"] === "lastName"
        ) {
          setShowerr("Name field should not be empty");
        } else {
          setShowerr(`${json.errors[0]["msg"]} of ${json.errors[0]["path"]}`);
        }
      }
    }
  };

  return (
    <>
      <div className="pluckd-register-container">
        <div className="pluckd-leaf-decoration">🍃</div>
        <div className="pluckd-leaf-decoration">🌿</div>

        <div className="pluckd-register-card">
          <h2 className="pluckd-register-title">Register</h2>

          <div className="pluckd-form-row">
            <div className="pluckd-form-group half-width">
              <label htmlFor="firstName" className="pluckd-form-label">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="pluckd-form-input"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="pluckd-form-group half-width">
              <label htmlFor="lastName" className="pluckd-form-label">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="pluckd-form-input"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="pluckd-form-group">
            <label htmlFor="email" className="pluckd-form-label">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="pluckd-form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {showerr && <div className="pluckd-error-message">{showerr}</div>}
          </div>

          <div className="pluckd-form-group">
            <label htmlFor="password" className="pluckd-form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="pluckd-form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="pluckd-register-btn" onClick={handleRegister}>
            Register
          </button>

          <p className="pluckd-login-link">
            Already a member? <button className="register-link" onClick={()=>(navigate('/app/login'))}>Login</button>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
