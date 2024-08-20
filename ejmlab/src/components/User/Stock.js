import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "./../CustomTabPanel";
import Layout from "./../Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./../../styles/StockPage.css";

const StockDetails = () => {
  const [value, setValue] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [matierePremieres, setMatierePremieres] = useState([]);
  const [products, setProducts] = useState([]);
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
    nomProduit: "",
    contenance: "",
    nombreVariants: "",
    densite20C: "",
    aspect: "",
    dchl: "",
    alcaliLibreNaOH: "",
    detartrant: "",
    vvalidation: "",
    phvalidation: "",
    phmin: "",
    vmax: "",
    vmin: "",
    phmax: "",
    odeur: "",
    couleur: "",
    typeDeStock: "",
  });
  const [selectedStock, setSelectedStock] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    stockCode: "",
    article: "",
  });

  const fetchStockData = () => {
    setLoading(true);
    axios
      .get("http://localhost:8085/stock")
      .then((response) => {
        setStocks(response.data);
        setFilteredStocks(response.data); // Also update filtered stocks
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des stocks.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStockData(); // Initial data fetch
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8084/matierePremieres")
      .then((response) => {
        setMatierePremieres(response.data);
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des matières premières.");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8084/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des produits.");
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8085/stock/${id}`)
      .then(() => {
        fetchStockData();
      })
      .catch((error) => {
        setError("Erreur lors de la suppression du stock.");
      });
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });

    if (name === "matierePremiereId" && value) {
      const details = matierePremieres.find(
        (matiere) => matiere.id === parseInt(value)
      );
      if (details) {
        setNewStock({
          ...newStock,
          article: details.article,
          fabricant: details.fabricant || "",
          fournisseur: details.fournisseur,
          code: details.code,
          observation: details.observation,
          categorie: details.categorie.libelle,
          nfamille: details.nfamille,
        });
      }
    }
  };

  const handleArticleChange = (e) => {
    const selectedArticleId = e.target.value;
    const selectedArticle = matierePremieres.find(
      (matiere) => matiere.id === parseInt(selectedArticleId)
    );

    if (selectedArticle) {
      setNewStock({
        ...newStock,
        matierePremiereId: selectedArticleId,
        article: selectedArticle.article,
        fabricant: selectedArticle.fabricant || "",
        fournisseur: selectedArticle.fournisseur,
        code: selectedArticle.code,
        observation: selectedArticle.observation,
        categorie: selectedArticle.categorie.libelle,
        nfamille: selectedArticle.nfamille,
      });
    }
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(
      (product) => product.id === parseInt(selectedProductId)
    );

    if (selectedProduct) {
      setNewStock({
        ...newStock,
        nomProduit: selectedProduct.nomProduit,
        contenance: selectedProduct.contenance,
        nombreVariants: selectedProduct.nombreVariants,
        categorie: selectedProduct.categorie.libelle,
        densite20C: selectedProduct.caracteristiquesPhysicoChimiques.densite20C,
        aspect: selectedProduct.caracteristiquesPhysicoChimiques.aspect,
        dchl: selectedProduct.caracteristiquesPhysicoChimiques.dchl,
        alcaliLibreNaOH:
          selectedProduct.caracteristiquesPhysicoChimiques.alcaliLibreNaOH,
        detartrant: selectedProduct.caracteristiquesPhysicoChimiques.detartrant,
        vvalidation:
          selectedProduct.caracteristiquesPhysicoChimiques.vvalidation,
        phvalidation:
          selectedProduct.caracteristiquesPhysicoChimiques.phvalidation,
        phmin: selectedProduct.caracteristiquesPhysicoChimiques.phmin,
        vmax: selectedProduct.caracteristiquesPhysicoChimiques.vmax,
        vmin: selectedProduct.caracteristiquesPhysicoChimiques.vmin,
        phmax: selectedProduct.caracteristiquesPhysicoChimiques.phmax,
        odeur: selectedProduct.caracteristiquesOrganoleptiques.odeur,
        couleur: selectedProduct.caracteristiquesOrganoleptiques.couleur,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8085/stock", newStock)
      .then((response) => {
        fetchStockData();
        setStocks([...stocks, response.data]);
        setValue(0);
      })
      .catch((error) => {
        setError("Erreur lors de l'ajout du stock.");
      });
  };

  const handleEditClick = (stock) => {
    setSelectedStock(stock);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8085/stock/${selectedStock.id}`, selectedStock)
      .then((response) => {
        setStocks(
          stocks.map((stock) =>
            stock.id === selectedStock.id ? response.data : stock
          )
        );
        fetchStockData();
        handleDialogClose();
      })
      .catch((error) => {
        setError("Erreur lors de la modification du stock.");
      });
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.target;
    setSelectedStock({ ...selectedStock, [name]: value });
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  const applyFilters = () => {
    let filtered = stocks;

    if (filterValues.stockCode) {
      filtered = filtered.filter((stock) =>
        stock.stockCode
          .toLowerCase()
          .includes(filterValues.stockCode.toLowerCase())
      );
    }

    if (filterValues.article) {
      filtered = filtered.filter((stock) => {
        const articleDetails = matierePremieres.find(
          (matiere) => matiere.id === stock.matierePremiereId
        );
        return articleDetails?.article
          .toLowerCase()
          .includes(filterValues.article.toLowerCase());
      });
    }

    setFilteredStocks(filtered);
    setFilterDialogOpen(false);
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
              <Button
                variant="outlined"
                onClick={() => setFilterDialogOpen(true)}
              >
                Filtrer
              </Button>
              <Button
                variant="outlined"
                onClick={fetchStockData} // Refresh only the table data
              >
                Rafraîchir
              </Button>
              {loading && <div>Chargement...</div>}
              {error && <div className="error-message">{error}</div>}
              {filteredStocks.length > 0 && (
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Stock Code</th>
                      <th>Quantité</th>
                      <th>Date de réception</th>
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
                    {filteredStocks.map((stock) => {
                      const details = matierePremieres.find(
                        (matiere) => matiere.id === stock.matierePremiereId
                      );
                      return (
                        <tr key={stock.id}>
                          <td>{stock.stockCode}</td>
                          <td>{stock.quantite}</td>
                          <td>
                            {new Date(stock.dateReception).toLocaleDateString()}
                          </td>
                          <td>{details ? details.article : "Chargement..."}</td>
                          <td>
                            {details
                              ? details.fabricant || "N/A"
                              : "Chargement..."}
                          </td>
                          <td>
                            {details ? details.fournisseur : "Chargement..."}
                          </td>
                          <td>{details ? details.code : "Chargement..."}</td>
                          <td>
                            {details ? details.observation : "Chargement..."}
                          </td>
                          <td>
                            {details
                              ? details.categorie.libelle
                              : "Chargement..."}
                          </td>
                          <td>
                            {details ? details.nfamille : "Chargement..."}
                          </td>
                          <td>
                            <button
                              className="edit-button"
                              onClick={() => handleEditClick(stock)}
                            >
                              Modifier
                            </button>
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
        </div>

        {/* Edit Stock Dialog */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Modifier le Stock</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                margin="dense"
                label="Stock Code"
                name="stockCode"
                value={selectedStock?.stockCode || ""}
                onChange={handleDialogChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Quantité"
                name="quantite"
                value={selectedStock?.quantite || ""}
                onChange={handleDialogChange}
                fullWidth
              />

              {/* Add other fields here */}
              <label>
                Article:
                <select
                  name="matierePremiereId"
                  value={selectedStock?.matierePremiereId || ""}
                  onChange={handleDialogChange}
                  required
                >
                  <option value="">Sélectionnez un article</option>
                  {matierePremieres.map((matiere) => (
                    <option key={matiere.id} value={matiere.id}>
                      {matiere.article}
                    </option>
                  ))}
                </select>
              </label>

              {/* Add additional fields as necessary */}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Annuler</Button>
            <Button onClick={handleDialogSubmit}>Enregistrer</Button>
          </DialogActions>
        </Dialog>
        {/* Filter Dialog */}
        <Dialog
          open={filterDialogOpen}
          onClose={() => setFilterDialogOpen(false)}
        >
          <DialogTitle>Filtrer les Stocks</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Stock Code"
              name="stockCode"
              value={filterValues.stockCode}
              onChange={handleFilterChange}
              fullWidth
            />

            <label className="custom-select-label">
              Article:
              <select
                name="article"
                value={filterValues.article}
                onChange={handleFilterChange}
                required
              >
                <option value="">Sélectionnez un article</option>
                {matierePremieres.map((matiere) => (
                  <option key={matiere.id} value={matiere.article}>
                    {matiere.article}
                  </option>
                ))}
              </select>
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilterDialogOpen(false)}>Annuler</Button>
            <Button onClick={applyFilters}>Appliquer</Button>
          </DialogActions>
        </Dialog>
      </div>
      <CustomTabPanel value={value} index={1}>
        <div className="add-new-section">
          <h2 className="titre">Ajouter un nouveau stock</h2>
          <form className="new-stock-form" onSubmit={handleSubmit}>
            <label>
              Type de stock:
              <select
                name="typeDeStock"
                value={newStock.typeDeStock}
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionnez un type de stock</option>
                <option value="matierePremiere">Matière Première</option>
                <option value="produitFini">Produit Fini</option>
              </select>
            </label>
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
              Date de réception:
              <input
                type="date"
                name="dateReception"
                value={newStock.dateReception}
                onChange={handleInputChange}
                required
              />
            </label>
            {newStock.typeDeStock === "matierePremiere" && (
              <>
                <label>
                  Article:
                  <select
                    name="matierePremiereId"
                    value={newStock.matierePremiereId}
                    onChange={handleArticleChange}
                    required
                  >
                    <option value="">Sélectionnez un article</option>
                    {matierePremieres.map((matiere) => (
                      <option key={matiere.id} value={matiere.id}>
                        {matiere.article}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Catégorie:
                  <input
                    name="categorie"
                    value={newStock.categorie}
                    onChange={handleInputChange}
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
                  Famille:
                  <input
                    type="text"
                    name="nfamille"
                    value={newStock.nfamille}
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
              </>
            )}
            {newStock.typeDeStock === "produitFini" && (
              <>
                <label>
                  Nom du produit:
                  <select
                    name="nomProduit"
                    value={newStock.nomProduit}
                    onChange={handleProductChange}
                  >
                    <option value="">Sélectionnez un produit</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.nomProduit}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Contenance:
                  <input
                    type="text"
                    name="contenance"
                    value={newStock.contenance}
                    readOnly
                  />
                </label>
                <label>
                  Nombre de variantes:
                  <input
                    type="text"
                    name="nombreVariants"
                    value={newStock.nombreVariants}
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
                  Densité (20°C):
                  <input
                    type="text"
                    name="densite20C"
                    value={newStock.densite20C}
                    readOnly
                  />
                </label>
                <label>
                  Aspect:
                  <input
                    type="text"
                    name="aspect"
                    value={newStock.aspect}
                    readOnly
                  />
                </label>
                <label>
                  DCHL:
                  <input
                    type="text"
                    name="dchl"
                    value={newStock.dchl}
                    readOnly
                  />
                </label>
                <label>
                  Alcalis Libre NaOH:
                  <input
                    type="text"
                    name="alcaliLibreNaOH"
                    value={newStock.alcaliLibreNaOH}
                    readOnly
                  />
                </label>
                <label>
                  Détartrant:
                  <input
                    type="text"
                    name="detartrant"
                    value={newStock.detartrant}
                    readOnly
                  />
                </label>
                <label>
                  Validation (V):
                  <input
                    type="text"
                    name="vvalidation"
                    value={newStock.vvalidation}
                    readOnly
                  />
                </label>
                <label>
                  pH Validation:
                  <input
                    type="text"
                    name="phvalidation"
                    value={newStock.phvalidation}
                    readOnly
                  />
                </label>
                <label>
                  pH Min:
                  <input
                    type="text"
                    name="phmin"
                    value={newStock.phmin}
                    readOnly
                  />
                </label>
                <label>
                  Vmax:
                  <input
                    type="text"
                    name="vmax"
                    value={newStock.vmax}
                    readOnly
                  />
                </label>
                <label>
                  Vmin:
                  <input
                    type="text"
                    name="vmin"
                    value={newStock.vmin}
                    readOnly
                  />
                </label>
                <label>
                  pH Max:
                  <input
                    type="text"
                    name="phmax"
                    value={newStock.phmax}
                    readOnly
                  />
                </label>
                <label>
                  Odeur:
                  <input
                    type="text"
                    name="odeur"
                    value={newStock.odeur}
                    readOnly
                  />
                </label>
                <label>
                  Couleur:
                  <input
                    type="text"
                    name="couleur"
                    value={newStock.couleur}
                    readOnly
                  />
                </label>
              </>
            )}
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </CustomTabPanel>
    </Layout>
  );
};

export default StockDetails;
