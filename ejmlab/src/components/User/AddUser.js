import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../Layout";

function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [role, setRole] = useState("");
  const roles = [
    {
      value: "Responsable",
      label: "Responsable",
    },
    {
      value: "Technicien",
      label: "Technicien",
    },
    {
      value: "Agent Achat",
      label: "Agent Achat",
    },
  ];

  const navigate = useNavigate();

  const Create = (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !name ||
      !prenom ||
      !telephone ||
      !adresse ||
      !role
    ) {
      alert("All fields are required. Please fill in all the details.");
      return;
    }
    const user = { email, password, name, prenom, telephone, adresse, role };
    console.log(user);
    fetch("http://localhost:8085/CreateUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      alert("User Aded");
      console.log("New User added");
      navigate("/User");
      // Optionally, fetch updated user list after adding
    });
  };
  const Cancel = (e) => {
    e.preventDefault();
    navigate("/User");
  };

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center pt-4">
        <h2 className="titre">Add Employee</h2>
        <form className="row g-3 w-50">
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col">
                <label className="form-label">Prenom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Prenom"
                  autoComplete="off"
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Telephone</label>
            <input
              type="tel"
              pattern="[0-9]*"
              className="form-control"
              placeholder="Enter Telephone"
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setTelephone(value);
              }}
              value={telephone} // Set value to maintain controlled input
            />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col">
                <label className="form-label">Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Adresse"
                  autoComplete="off"
                  onChange={(e) => setAdresse(e.target.value)}
                />
              </div>
              <div className="col">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-between">
            <button type="submit" className="btn btn-primary" onClick={Create}>
              Create
            </button>
            <button type="button" className="btn btn-danger" onClick={Cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AddUser;
