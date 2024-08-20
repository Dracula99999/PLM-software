import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./../Layout";
import "./../../styles/Userpage.css"; // New CSS file for Userpage

function Users() {
  const [users, setUsers] = useState([]);
  const [searchPrenom, setSearchPrenom] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false); // State to handle popup visibility
  const [selectedRole, setSelectedRole] = useState(""); // State to handle selected role

  const fetchUsers = () => {
    fetch("http://localhost:8085/Users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
        setFilteredUsers(result); // Set initial filtered users
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des utilisateurs: ",
          error
        );
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const lowerCasePrenom = searchPrenom.toLowerCase();
    const filtered = users.filter((user) =>
      user.prenom.toLowerCase().includes(lowerCasePrenom)
    );
    setFilteredUsers(filtered);
  };

  const handleReset = () => {
    setSearchPrenom("");
    setFilteredUsers(users);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:8085/DeleteUser/" + id)
        .then(() => {
          fetchUsers();
        })
        .catch((error) => {
          console.error(
            `Erreur lors de la suppression de l'utilisateur avec ID ${id}: `,
            error
          );
        });
    }
  };

  const handleFilterByRole = () => {
    if (selectedRole) {
      const filtered = users.filter((user) => user.role === selectedRole);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Refresh the table if "Tous les rôles" is selected
    }
    setShowFilterPopup(false); // Close the popup after applying the filter
  };

  const handleResetFilters = () => {
    setSelectedRole("");
    setFilteredUsers(users);
    setShowFilterPopup(false); // Close the popup after resetting the filter
  };

  return (
    <Layout>
      <div className="user-container">
        <h3 className="text-center">Liste des Utilisateurs</h3>
        <div className="action-bar">
          <div className="search-section">
            <input
              type="text"
              placeholder="Rechercher par prénom"
              value={searchPrenom}
              onChange={(e) => setSearchPrenom(e.target.value)}
            />
            <button onClick={handleSearch} className="action-button">
              Rechercher
            </button>
            <button
              onClick={handleReset}
              className="action-button reset-button"
            >
              Réinitialiser
            </button>
          </div>
          <button
            onClick={() => setShowFilterPopup(true)}
            className="action-button filter-button"
          >
            Filtres
          </button>
          <Link to="/AddUser" className="action-button add-user-button">
            Ajouter un Utilisateur
          </Link>
        </div>
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>role</th>
                <th>Email</th>
                <th>Mot de passe</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.prenom}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Link
                      to={`/EditUser/${user.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Darken background and display popup */}
        {showFilterPopup && (
          <div className="overlay">
            <div className="filter-popup">
              <div className="filter-popup-content">
                <h4>Filtrer par rôle</h4>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="role-select"
                >
                  <option value="">Tous les rôles</option>
                  <option value="Responsable">Responsable</option>
                  <option value="Technicien">Technicien</option>
                  <option value="Agent Achat">Agent Achat</option>
                </select>
                <div className="popup-buttons">
                  <button
                    onClick={handleFilterByRole}
                    className="action-button apply-filter-button"
                  >
                    Appliquer
                  </button>
                  <button
                    onClick={handleResetFilters}
                    className="action-button reset-filter-button"
                  >
                    Réinitialiser
                  </button>
                  <button
                    onClick={() => setShowFilterPopup(false)}
                    className="action-button close-popup-button"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Users;
