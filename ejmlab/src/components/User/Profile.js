import React, { useState, useEffect } from "react";
import Layout from "./../Layout";

function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      // Handle the case where the user ID is not available in local storage
      console.error("User ID not found in local storage");
      return;
    }

    fetch(`http://localhost:8085/GetUser/${userId}`)
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          // Update state values with fetched user details
          setEmail(result.email);
          setName(result.name);
          setPrenom(result.prenom);
          setTelephone(result.telephone);
          setAdresse(result.adresse);
          setRole(result.role);
        }
      });
  }, []);

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center pt-4">
        <h2 className="titre">User Profile</h2>
        <form className="row g-3 w-50">
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              value={email}
              type="text"
              className="form-control"
              placeholder="Enter Email"
              readOnly
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
                  readOnly
                />
              </div>
              <div className="col">
                <label className="form-label">Name</label>
                <input
                  value={name}
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Telephone</label>
            <input
              value={telephone}
              type="text"
              className="form-control"
              placeholder="Enter Telephone"
              readOnly
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
                  readOnly
                />
              </div>
              <div className="col">
                <label className="form-label">Role</label>
                <input
                  value={role}
                  type="text"
                  className="form-control"
                  placeholder="Enter Role"
                  readOnly
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Profile;
