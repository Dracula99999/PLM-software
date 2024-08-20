import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "./../CustomTabPanel";
import Layout from "./../Layout";
import "./../../styles/StockPage.css"; // Updated to new CSS file name

const StockDetails = () => {
  const [value, setValue] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matiereDetails, setMatiereDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const [newStock, setNewStock] = useState({
    stockCode: "",
    quantite: "",
    matierePremiereId: "",
    article: "",
    fabricant: "",
    fournisseur: "",
    code: "",
    observation: "",
    categorie: "",
    nfamille: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8085/stock")
      .then((response) => {
        setStocks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des stocks.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      stocks.forEach((stock) => {
        fetchMatiereDetails(stock.matierePremiereId);
      });
    }
  }, [stocks]);
  useEffect(() => {
    axios
      .get("http://localhost:8084/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des catégories.");
      });
  }, []);
  const fetchMatiereDetails = async (matierePremiereId) => {
    try {
      const response = await axios.get(
        `http://localhost:8084/matierePremieres/${matierePremiereId}`
      );
      return response.data;
    } catch (error) {
      setError(
        "Erreur lors de la récupération des détails de la matière première."
      );
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });

    if (name === "matierePremiereId" && value) {
      const details1 = await fetchMatiereDetails(value);
      if (details1) {
        setNewStock((prevState) => ({
          ...prevState,
          article: details1.article,
          fabricant: details1.fabricant || "",
          fournisseur: details1.fournisseur,
          code: details1.code,
          observation: details1.observation,
          categorie: details1.categorie.libelle,
          nfamille: details1.nfamille,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8085/stock", newStock)
      .then((response) => {
        setStocks([...stocks, response.data]);
        setValue(0); // Switch back to the stock list tab
      })
      .catch((error) => {
        setError("Erreur lors de l'ajout du stock.");
      });
  };
  useEffect(() => {
    const fetchMatiereDetails = async (matierePremiereId) => {
      try {
        const response = await axios.get(
          `http://localhost:8084/matierePremieres/${matierePremiereId}`
        );
        setMatiereDetails((prevDetails) => ({
          ...prevDetails,
          [matierePremiereId]: response.data,
        }));
      } catch (error) {
        setError(
          "Erreur lors de la récupération des détails de la matière première."
        );
      }
    };

    if (stocks.length > 0) {
      stocks.forEach((stock) => {
        if (!matiereDetails[stock.matierePremiereId]) {
          fetchMatiereDetails(stock.matierePremiereId);
        }
      });
    }
  }, [stocks, matiereDetails]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8085/stock/${id}`)
      .then(() => {
        setStocks(stocks.filter((stock) => stock.id !== id));
      })
      .catch((error) => {
        setError("Erreur lors de la suppression du stock.");
      });
  };

  return (
    <Layout>
      <div className="stock-details-container">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              borderBottom: "1px solid #ccc",
              "& .MuiTabs-indicator": {
                backgroundColor: "transparent",
              },
              ".css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected ": {
                color: "#dd191f",
              },
            }}
          >
            <Tab label="Liste des stocks" />
            <Tab label="Ajouter un nouveau stock" />
          </Tabs>
        </Box>
        <div className="stock-details-content">
          <CustomTabPanel value={value} index={0}>
            <div className="stock-list-section">
              <h2 className="titre">Liste des stocks</h2>
              {loading && <div>Chargement...</div>}
              {error && <div className="error-message">{error}</div>}
              {stocks.length > 0 && (
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Stock Code</th>
                      <th>Quantité</th>
                      <th>Date de création</th>
                      <th>Article</th>
                      <th>Fabricant</th>
                      <th>Fournisseur</th>
                      <th>Code MP</th>
                      <th>Observation</th>
                      <th>Catégorie</th>
                      <th>Famille</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock) => {
                      const details1 = matiereDetails[stock.matierePremiereId];
                      return (
                        <tr key={stock.id}>
                          <td>{stock.stockCode}</td>
                          <td>{stock.quantite}</td>
                          <td>
                            {new Date(stock.creationDate).toLocaleDateString()}
                          </td>
                          <td>
                            {details1 ? details1.article : "Chargement..."}
                          </td>
                          <td>
                            {details1
                              ? details1.fabricant || "N/A"
                              : "Chargement..."}
                          </td>
                          <td>
                            {details1 ? details1.fournisseur : "Chargement..."}
                          </td>
                          <td>{details1 ? details1.code : "Chargement..."}</td>
                          <td>
                            {details1 ? details1.observation : "Chargement..."}
                          </td>
                          <td>
                            {details1
                              ? details1.categorie.libelle
                              : "Chargement..."}
                          </td>
                          <td>
                            {details1 ? details1.nfamille : "Chargement..."}
                          </td>
                          <td>
                            <button
                              className="delete-button"
                              onClick={() => handleDelete(stock.id)}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="add-new-section">
              <h2 className="titre">Ajouter un nouveau stock</h2>
              <form className="new-stock-form" onSubmit={handleSubmit}>
                <label>
                  Code du stock:
                  <input
                    type="text"
                    name="stockCode"
                    value={newStock.stockCode}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Quantité:
                  <input
                    type="number"
                    name="quantite"
                    value={newStock.quantite}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  ID Matière Première:
                  <input
                    type="text"
                    name="matierePremiereId"
                    value={newStock.matierePremiereId}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Article:
                  <input
                    type="text"
                    name="article"
                    value={newStock.article}
                    readOnly
                  />
                </label>
                <label>
                  Fabricant:
                  <input
                    type="text"
                    name="fabricant"
                    value={newStock.fabricant}
                    readOnly
                  />
                </label>
                <label>
                  Fournisseur:
                  <input
                    type="text"
                    name="fournisseur"
                    value={newStock.fournisseur}
                    readOnly
                  />
                </label>
                <label>
                  Code:
                  <input
                    type="text"
                    name="code"
                    value={newStock.code}
                    readOnly
                  />
                </label>
                <label>
                  Observation:
                  <input
                    type="text"
                    name="observation"
                    value={newStock.observation}
                    readOnly
                  />
                </label>
                <label>
                  Catégorie:
                  <input
                    type="text"
                    name="categorie"
                    value={newStock.categorie}
                    readOnly
                  />
                </label>
                <label>
                  Famille:
                  <input
                    type="text"
                    name="nfamille"
                    value={newStock.nfamille}
                    readOnly
                  />
                </label>
                <button type="submit">Ajouter</button>
              </form>
            </div>
          </CustomTabPanel>
        </div>
      </div>
    </Layout>
  );
};

export default StockDetails;
