import React, { useState } from "react";
import login from "./login.png";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const Log = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      setErrorMessage("Please enter both email and password.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8085/LoginUser/checkCredentials?email=${email}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User authentication response:", data);
      if (data === 1 || data === 2) {
        setError(true); // Set error state to true if authentication fails

        if (data === 1) {
          setErrorMessage("User not found. Please try again.");
        } else if (data === 2) {
          setErrorMessage("Invalid password. Please try again.");
        }
      } else {
        setError(false); // Reset error state if authentication succeeds
        setErrorMessage(""); // Clear error message
        console.log(errorMessage);

        // Fetch the user ID after successful authentication
        const responseId = await fetch(
          `http://localhost:8085/LoginUserGetId?email=${email}&password=${password}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!responseId.ok) {
          throw new Error(`HTTP error! Status: ${responseId.status}`);
        }

        const dataId = await responseId.json();
        console.log("User ID:", dataId);

        // Store the user ID in local storage
        localStorage.setItem("userId", dataId);

        // Navigate to the desired page
        navigate("/matiere-premiere");
      }
    } catch (error) {
      setError(true);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 150 }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={login} alt="img" className="img-fluid" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p
                  className="lead fw-normal mb-0 me-3"
                  style={{ fontSize: 35 }}
                >
                  Login to your account
                </p>
              </div>
              <h1
                style={{
                  color: "red",
                  fontSize: "15px",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {error && errorMessage}
              </h1>
              <div className="form-outline mb-4">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                  />
                  <label className="form-check-label">Remember me</label>
                </div>
                <a href="/#" className="text-body">
                  Forgot password?
                </a>
              </div>
              {error && (
                <Alert style={{ marginTop: 10 }} severity="error">
                  {errorMessage}
                </Alert>
              )}
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
