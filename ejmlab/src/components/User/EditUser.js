import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./../Layout";

function EditUser() {
  const { id } = useParams();
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

  const Cancel = (e) => {
    e.preventDefault();
    navigate("/User");
  };

  useEffect(() => {
    fetch("http://localhost:8085/GetUser/" + id)
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          // Update state values with fetched user details
          setEmail(result.email);
          setPassword(result.password);
          setName(result.name);
          setPrenom(result.prenom);
          setTelephone(result.telephone);
          setAdresse(result.adresse);
          setRole(result.role);
        }
      });
  }, [id]);

  const Update = (e) => {
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
    fetch(`http://localhost:8085/UpdateUserId/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then(() => {
      alert("User Modified");
      navigate("/User");
    });
  };

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center pt-4">
        <h2 className="titre">Edit Employee</h2>
        <form className="row g-3 w-50">
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              value={email}
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
              value={password}
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
                  value={prenom}
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
                  value={name}
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
              value={telephone}
              type="email"
              className="form-control"
              placeholder="Enter Telephone"
              autoComplete="off"
              onChange={(e) => {
                setTelephone(e.target.value);
              }}
            />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col">
                <label className="form-label">Adresse</label>
                <input
                  value={adresse}
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
            <button type="submit" className="btn btn-primary" onClick={Update}>
              Update
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

export default EditUser;
