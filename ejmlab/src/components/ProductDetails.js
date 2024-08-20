import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from './CustomTabPanel';
import Layout from './Layout';
import './../styles/ProductDetails.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const ProductDetails = () => {
    const [value, setValue] = useState(0);
    const [id, setId] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productList, setProductList] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [openFilters, setOpenFilters] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const [newProduct, setNewProduct] = useState({
        nomProduit: '',
        contenance: '',
        nombreVariants: 0,
        categorieId: '',
        caracteristiquesPhysicoChimiques: null,
        caracteristiquesOrganoleptiques: null,
    });

    useEffect(() => {
        axios.get('http://localhost:8084/products')
            .then(response => {
                setProductList(response.data);
                setFilteredProductList(response.data);
            })
            .catch(error => {
                setError("Erreur lors de la récupération de la liste des produits.");
            });



        axios.get('http://localhost:8084/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                setError("Erreur lors de la récupération des catégories.");
            });
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setId(value);
        filterProductList(value, selectedCategory);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        filterProductList(id, value);
    };

    const filterProductList = (id, category) => {
        const filteredList = productList.filter(product =>
            product.id.toString().startsWith(id.toString()) &&
            (category === '' || product.categorie.id === parseInt(category))
        );
        setFilteredProductList(filteredList);
    };

    const handleSelectProduct = (selectedId) => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:8084/products/${selectedId}`)
            .then(response => {
                setProduct(response.data);
                setId(`${response.data.id} - ${response.data.nomProduit}`);
                setSelectedProduct(response.data.nomProduit);
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur lors de la récupération des détails. Veuillez vérifier le ID et réessayer.");
                setLoading(false);
            });
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewProductSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        axios.post('http://localhost:8084/products/createProduct', {
            categorie: {
                id: newProduct.categorieId
            },
            nomProduit: newProduct.nomProduit,
            nombreVariants: newProduct.nombreVariants,
            contenance: newProduct.contenance,
        })
            .then(response => {
                setProductList([...productList, response.data]);
                setFilteredProductList([...filteredProductList, response.data]);
                setNewProduct({
                    nomProduit: '',
                    nombreVariants: 0,
                    contenance: '',
                    categorieId: ''
                });
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur lors de la création du produit.");
                setLoading(false);
            });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenFilters = () => {
        setOpenFilters(true);
    };

    const handleCloseFilters = () => {
        setOpenFilters(false);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [updatedProduct, setUpdatedProduct] = useState({
        nomProduit: '',
        contenance: '',
        nombreVariants: 0,
        categorie:{
            id: '',
            libelle:'',
            parent: {
                id: '',
                designation: ''
            }
        }
    });

    const handleUpdateProduct = () => {
        setUpdatedProduct({
            nomProduit: product.nomProduit,
            nombreVariants: product.nombreVariants,
            contenance: product.contenance,
            categorie: {
                id: product.categorie.id,
                libelle:product.categorie.libelle,
                parent: {
                    id: product.categorie.parent.id,
                    designation: product.categorie.parent.designation
                }
            },
        });
        setOpenUpdateDialog(true);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        axios.put(`http://localhost:8084/products/${product.id}`, {
            categorie: {
                id: updatedProduct.categorie.id,
                libelle: updatedProduct.categorie.libelle,
                parent: {
                    id: updatedProduct.categorie.parent.id,
                    designation: updatedProduct.categorie.parent.designation
                }
            },
            nomProduit: updatedProduct.nomProduit,
            nombreVariants: updatedProduct.nombreVariants,
            contenance: updatedProduct.contenance,
        })
            .then(response => {
                const updatedProductList = productList.map(item => {
                    if (item.id === product.id) {
                        return response.data;
                    }
                    return item;
                });
                setProductList(updatedProductList);
                setFilteredProductList(updatedProductList);
                setProduct(response.data);
                setLoading(false);
                setOpenUpdateDialog(false);
            })
            .catch(error => {
                setError("Erreur lors de la mise à jour du produit.");
                setLoading(false);
            });
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    const handleDeleteProduct = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            setLoading(true);
            axios.delete(`http://localhost:8084/products/${product.id}`)
                .then(response => {
                    const updatedProductList = productList.filter(item => item.id !== product.id);
                    setProductList(updatedProductList);
                    setFilteredProductList(updatedProductList);
                    setLoading(false);
                    setProduct(null);
                })
                .catch(error => {
                    setError("Erreur lors de la suppression du produit.");
                    setLoading(false);
                });
        }
    };

    return (
        <Layout>
            <div className="product-premiere-details-container">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                          sx={{
                              borderBottom: '1px solid #ccc',
                              '& .MuiTabs-indicator': {
                                  backgroundColor: 'transparent',
                              },
                              '.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected ': {
                                  color: '#dd191f',
                              },
                          }}>
                        <Tab label="Liste des produits finis" />
                        <Tab label="Ajouter un nouveau produit fini" />
                    </Tabs>
                </Box>
                <div className="product-premiere-details-content">
                    <CustomTabPanel value={value} index={0}>
                        <div className="product-list-section">
                            <h2 class="titre">Liste des produits finis</h2>
                            <button className="buttons-container" onClick={handleOpenFilters}>Ouvrir les filtres</button>
                            <Dialog open={openFilters} onClose={handleCloseFilters}>
                                <DialogTitle>Filtres de recherche avancée</DialogTitle>
                                <DialogContent>
                                    <h3>Catégorie:</h3>
                                    <select value={selectedCategory} onChange={handleCategoryChange}
                                            className="category-select">
                                        <option value="">Toutes les catégories</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.libelle}</option>
                                        ))}
                                    </select>
                                </DialogContent>
                                <DialogActions>
                                    <button className="buttons-container" onClick={handleCloseFilters}>Fermer</button>
                                </DialogActions>
                            </Dialog>

                            <input
                                type="text"
                                placeholder="Entrez le ID du produit fini"
                                value={id}
                                onChange={handleInputChange}
                                className="search-input"
                            />
                            {filteredProductList.length > 0 && (
                                <div className="dropdowns">
                                    {filteredProductList.map(product => (
                                        <div
                                            key={product.id}
                                            onClick={() => handleSelectProduct(product.id)}
                                            className="dropdowns-item"
                                        >
                                            {product.id} - {product.nomProduit}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {loading && <div>Chargement...</div>}
                            {error && <div className="error-message">{error}</div>}
                            {product && (
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <span className="label">ID :</span> {product.id}
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Nom du produit :</span> {product.nomProduit}
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Nombre de variants :</span> {product.nombreVariants}
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Contenance :</span> {product.contenance}
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Catégorie :</span> {product.categorie.libelle}
                                    </div>

                                    <div className="detail-item">
                                        <button className="buttons-form" onClick={handleUpdateProduct}>Modifier
                                    </button>
                                        <button className="buttons-form" onClick={handleDeleteProduct}>Supprimer
                                    </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <div className="add-product-form-section">
                            <h2 className="titre">Ajouter un nouveau produit fini</h2>
                            <form onSubmit={handleNewProductSubmit} className="add-product-form">
                                <div className="form-group">
                                    <label htmlFor="nomProduit">Nom du produit:</label>
                                    <input
                                        type="text"
                                        id="nomProduit"
                                        name="nomProduit"
                                        value={newProduct.nomProduit}
                                        onChange={handleNewProductChange}
                                        className="form-input"

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contenance">Contenance:</label>
                                    <input
                                        type="text"
                                        id="contenance"
                                        name="contenance"
                                        value={newProduct.contenance}
                                        onChange={handleNewProductChange}
                                        className="form-input"

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombreVariants">Nombre de variants:</label>
                                    <input
                                        type="number"
                                        id="nombreVariants"
                                        name="nombreVariants"
                                        value={newProduct.nombreVariants}
                                        onChange={handleNewProductChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="dropdowns-item">
                                    <div className="form-group">

                                        <label htmlFor="categorieId">Catégorie:</label>
                                        <select
                                            id="categorieId"
                                            name="categorieId"
                                            value={newProduct.categorieId}
                                            onChange={handleNewProductChange}
                                            className="category-select"
                                            required
                                        >
                                            <option value="">Sélectionner une catégorie</option>
                                            {categories.map(category => (
                                                <option key={category.id}
                                                        value={category.id}>{category.libelle}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="buttons-container">Ajouter</button>
                            </form>
                        </div>
                    </CustomTabPanel>
                </div>
                <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
                    <DialogTitle>Modifier les détails du produit</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleUpdateSubmit} className="update-product-form">
                            <div className="form-group">
                                <label htmlFor="nomProduit">Nom du produit:</label>
                                <input
                                    type="text"
                                    id="nomProduit"
                                    name="nomProduit"
                                    value={updatedProduct.nomProduit}
                                    onChange={handleUpdateChange}
                                    className="form-input"

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contenance">Contenance:</label>
                                <input
                                    type="text"
                                    id="contenance"
                                    name="contenance"
                                    value={updatedProduct.contenance}
                                    onChange={handleUpdateChange}
                                    className="form-input"

                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreVariants">Nombre de variants:</label>
                                <input
                                    type="number"
                                    id="nombreVariants"
                                    name="nombreVariants"
                                    value={updatedProduct.nombreVariants}
                                    onChange={handleUpdateChange}
                                    className="form-input"

                                />
                            </div>
                            <div className="form-group">
                                <label>Catégorie</label>
                                <select name="categorieId" onChange={handleUpdateChange}
                                        value={updatedProduct.categorie.id} className="category-select" required>
                                    <option value="">Sélectionner une catégorie</option>
                                    {categories.map(categorie => (
                                        <option key={categorie.id}
                                                value={categorie.id}>{categorie.libelle}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="submit-button">Mettre à jour</button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <button className="buttons-container" onClick={handleCloseUpdateDialog}>Fermer</button>
                    </DialogActions>
                </Dialog>
            </div>
        </Layout>
    );
};

export default ProductDetails;
