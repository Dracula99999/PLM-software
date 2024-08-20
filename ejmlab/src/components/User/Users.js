import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./../Layout";

function Users() {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    fetch("http://localhost:8085/Users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
      });
  };
  useEffect(() => {
    fetch("http://localhost:8085/Users")
      .then((res) => res.json())

      .then((result) => {
        setUsers(result);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      axios

        .delete("http://localhost:8085/DeleteUser/" + id)
        .then(() => {
          // Optionally, fetch updated user list after deletion

          fetchUsers();
        })
        .catch((error) => {
          console.error(`Error deleting user with ID ${id}: `, error);
        });
    }
  };

  return (
    <Layout>
      <div className="px-5 py-3" style={{ justifyContent: "center" }}>
        <div className="d-flex justify-content-center mt-2">
          <h3>Liste des Utilisateurs</h3>
        </div>
        <Link
          to="/AddUser"
          className="btn btn-success"
          style={{ marginLeft: "10%" }}
        >
          Add User
        </Link>
        <div className="mt-3">
          <table
            className="table table-striped "
            style={{ width: "80%", marginLeft: "10%" }}
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Password</th>
                <th>Name</th>
                <th>Prenom</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.name}</td>
                    <td>{user.prenom}</td>
                    <td>
                      <Link
                        to={`/EditUser/` + user.id}
                        className="btn btn-primary btn-sm me-2"
                      >
                        edit
                      </Link>
                      <button
                        onClick={(e) => handleDelete(user.id)}
                        className="btn btn-sm btn-danger"
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
