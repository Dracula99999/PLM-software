import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from './CustomTabPanel';
import Layout from './Layout';
import './../styles/MatierePremiereDetails.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const MatierePremiereDetails = () => {
    const [value, setValue] = useState(0);
    const [code, setCode] = useState('');
    const [selectedMatiere, setSelectedMatiere] = useState('');
    const [matiere, setMatiere] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [matiereList, setMatiereList] = useState([]);
    const [filteredMatiereList, setFilteredMatiereList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFournisseur, setSelectedFournisseur] = useState('');
    const [selectedFabricant, setSelectedFabricant] = useState('');
    const [openFilters, setOpenFilters] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    const [newMatiere, setNewMatiere] = useState({
        article: '',
        fabricant: '',
        fournisseur: '',
        code: '',
        Nfamille: 0,
        observation: '',
        categorieId: '',
        dateReception: '',
        provenance: '',
        natureProduit: '',
        designation: '',
        codeERP: '',
        numLot: '',
        dlc: '',
        quantite: '',
        ph: '',
        densite: '',
        aspect: '',
        proprete: '',
        apparence: '',
        indiceRefraction: '',
        MMA: '',
        MAC: '',
        MANT: '',
        couleur: '',
        echelleIntensite: '',
        quantiteDeg: '',
        codeCouleur: '',
        decisionObservation: '',
        arrivageNum: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8084/matierePremieres')
            .then(response => {
                setMatiereList(response.data);
                setFilteredMatiereList(response.data);
            })
            .catch(error => {
                setError("Erreur lors de la récupération de la liste des matières premières.");
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
        setCode(value);
        filterMatiereList(value, selectedCategory, selectedFournisseur, selectedFabricant);
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        filterMatiereList(code, value, selectedFournisseur, selectedFabricant);
    };

    const handleFournisseurChange = (e) => {
        const value = e.target.value;
        setSelectedFournisseur(value);
        filterMatiereList(code, selectedCategory, value, selectedFabricant);
    };

    const handleFabricantChange = (e) => {
        const value = e.target.value;
        setSelectedFabricant(value);
        filterMatiereList(code, selectedCategory, selectedFournisseur, value);
    };

    const filterMatiereList = (code, category, fournisseur, fabricant) => {
        const filteredList = matiereList.filter(matiere =>
            matiere.code.toLowerCase().startsWith(code.toLowerCase()) &&
            (category === '' || matiere.categorie.id === parseInt(category)) &&
            (fournisseur === '' || matiere.fournisseur.toLowerCase().includes(fournisseur.toLowerCase())) &&
            (fabricant === '' || matiere.fabricant.toLowerCase().includes(fabricant.toLowerCase()))
        );
        setFilteredMatiereList(filteredList);
    };

    const handleSelectMatiere = (selectedCode) => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:8084/matierePremieres/code/${selectedCode}`)
            .then(response => {
                setMatiere(response.data);
                setCode(`${response.data.code} - ${response.data.article}`);
                setSelectedMatiere(response.data.article);
                setLoading(false);
                console.log(response.data);
            })
            .catch(error => {
                setError("Erreur lors de la récupération des détails. Veuillez vérifier le code et réessayer.");

                setLoading(false);
            });
    };

    const handleNewMatiereChange = (e) => {
        const { name, value } = e.target;
        setNewMatiere(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewMatiereSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        axios.post('http://localhost:8084/matierePremieres/creatematierePremiere', {
            categorie: {
                id: newMatiere.categorieId
            },
            article: newMatiere.article,
            fabricant: newMatiere.fabricant,
            fournisseur: newMatiere.fournisseur,
            code: newMatiere.code,
            observation: newMatiere.observation,
            nfamille: newMatiere.Nfamille,
            dateReception: newMatiere.dateReception,
            provenance: newMatiere.provenance,
            natureProduit: newMatiere.natureProduit,
            designation: newMatiere.designation,
            codeERP: newMatiere.codeERP,
            numLot: newMatiere.numLot,
            dlc: newMatiere.dlc,
            quantite: newMatiere.quantite,
            ph: newMatiere.ph,
            densite: newMatiere.densite,
            aspect: newMatiere.aspect,
            proprete: newMatiere.proprete,
            apparence: newMatiere.apparence,
            indiceRefraction: newMatiere.indiceRefraction,
            MMA: newMatiere.MMA,
            MAC: newMatiere.MAC,
            MANT: newMatiere.MANT,
            couleur: newMatiere.couleur,
            echelleIntensite:  newMatiere.echelleIntensite,
            quantiteDeg: newMatiere.quantiteDeg,
            codeCouleur: newMatiere.codeCouleur,
            decisionObservation: newMatiere.decisionObservation,
            arrivageNum: newMatiere.arrivageNum

        })
            .then(response => {
                setMatiereList([...matiereList, response.data]);
                setFilteredMatiereList([...filteredMatiereList, response.data]);
                setNewMatiere({
                    article: '',
                    fabricant: '',
                    fournisseur: '',
                    code: '',
                    Nfamille: 0,
                    observation: '',
                    categorieId: '',
                    dateReception: '',
                    provenance: '',
                    natureProduit: '',
                    designation: '',
                    codeERP: '',
                    numLot: '',
                    dlc: '',
                    quantite: '',
                    ph: '',
                    densite: '',
                    aspect: '',
                    proprete: '',
                    apparence: '',
                    indiceRefraction: '',
                    MMA: '',
                    MAC: '',
                    MANT: '',
                    couleur: '',
                    echelleIntensite: '',
                    quantiteDeg: '',
                    codeCouleur: '',
                    decisionObservation: '',
                    arrivageNum: ''
                });
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur lors de la création de la matière première.");
                setLoading(false);
            });
        console.log(newMatiere);
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
        setUpdatedMatiere(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleUpdateMatiere = () => {

        setUpdatedMatiere({
            article: matiere.article,
            fabricant: matiere.fabricant,
            fournisseur: matiere.fournisseur,
            code: matiere.code,
            observation: matiere.observation,
            Nfamille: matiere.nfamille,
            categorie: {
                id: matiere.categorie.id,
                libelle:matiere.categorie.libelle,
                parent: {
                    id: matiere.categorie.parent.id,
                    designation: matiere.categorie.parent.designation
                }
            },
            dateReception: matiere.dateReception,
            provenance: matiere.provenance,
            natureProduit: matiere.natureProduit,
            designation: matiere.designation,
            codeERP: matiere.codeERP,
            numLot: matiere.numLot,
            dlc: matiere.dlc,
            quantite: matiere.quantite,
            ph: matiere.ph,
            densite: matiere.densite,
            aspect: matiere.aspect,
            proprete: matiere.proprete,
            apparence: matiere.apparence,
            indiceRefraction: matiere.indiceRefraction,
            MMA: matiere.MMA,
            MAC: matiere.MAC,
            MANT: matiere.MANT,
            couleur: matiere.couleur,
            echelleIntensite:  matiere.echelleIntensite,
            quantiteDeg: matiere.quantiteDeg,
            codeCouleur: matiere.codeCouleur,
            decisionObservation: matiere.decisionObservation,
            arrivageNum: matiere.arrivageNum
        });
        setOpenUpdateDialog(true);
    };
    const [updatedMatiere, setUpdatedMatiere] = useState({
        article: '',
        fabricant: '',
        fournisseur: '',
        code: '',
        observation: '',
        Nfamille: 0,
        categorie:{
            id: '',
            libelle:'',
            parent: {
                id: '',
                designation: ''
            }
        },
        dateReception: '',
        provenance: '',
        natureProduit: '',
        designation: '',
        codeERP: '',
        numLot: '',
        dlc: '',
        quantite: '',
        ph: '',
        densite: '',
        aspect: '',
        proprete: '',
        apparence: '',
        indiceRefraction: '',
        MMA: '',
        MAC: '',
        MANT: '',
        couleur: '',
        echelleIntensite: '',
        quantiteDeg: '',
        codeCouleur: '',
        decisionObservation: '',
        arrivageNum: ''
    });

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log(updatedMatiere);
        axios.put(`http://localhost:8084/matierePremieres/${matiere.id}`, {
            id: updatedMatiere.id,
            categorie: {
                id: updatedMatiere.categorie.id,
                libelle: updatedMatiere.categorie.libelle,
                parent: {
                    id: updatedMatiere.categorie.parent.id,
                    designation: updatedMatiere.categorie.parent.designation
                }
            },
            article: updatedMatiere.article,
            fabricant: updatedMatiere.fabricant,
            fournisseur: updatedMatiere.fournisseur,
            code: updatedMatiere.code,
            observation: updatedMatiere.observation,
            nfamille: updatedMatiere.Nfamille,
            dateReception: updatedMatiere.dateReception,
            provenance: updatedMatiere.provenance,
            natureProduit: updatedMatiere.natureProduit,
            designation: updatedMatiere.designation,
            codeERP: updatedMatiere.codeERP,
            numLot: updatedMatiere.numLot,
            dlc: updatedMatiere.dlc,
            quantite: updatedMatiere.quantite,
            ph: updatedMatiere.ph,
            densite: updatedMatiere.densite,
            aspect: updatedMatiere.aspect,
            proprete: updatedMatiere.proprete,
            apparence: updatedMatiere.apparence,
            indiceRefraction: updatedMatiere.indiceRefraction,
            MMA: updatedMatiere.MMA,
            MAC: updatedMatiere.MAC,
            MANT: updatedMatiere.MANT,
            couleur: updatedMatiere.couleur,
            echelleIntensite:  updatedMatiere.echelleIntensite,
            quantiteDeg: updatedMatiere.quantiteDeg,
            codeCouleur: updatedMatiere.codeCouleur,
            decisionObservation: updatedMatiere.decisionObservation,
            arrivageNum: updatedMatiere.arrivageNum
        })
            .then(response => {
                const updatedMatiereList = matiereList.map(item => {
                    if (item.id === matiere.id) {
                        return response.data;
                    }
                    return item;
                });
                setMatiereList(updatedMatiereList);
                setFilteredMatiereList(updatedMatiereList);
                setMatiere(response.data);
                setLoading(false);
                setOpenUpdateDialog(false);

                console.log(response.data);
            })
            .catch(error => {
                setError("Erreur lors de la mise à jour de la matière première.");
                setLoading(false);
            });
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };
    const handleDeleteMatiere = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette matière première ?")) {
            setLoading(true);
            axios.delete(`http://localhost:8084/matierePremieres/${matiere.id}`)
                .then(response => {
                    const updatedMatiereList = matiereList.filter(item => item.code !== matiere.code);
                    setMatiereList(updatedMatiereList);
                    setFilteredMatiereList(updatedMatiereList);
                    setLoading(false);
                    setMatiere(null);
                })
                .catch(error => {
                    setError("Erreur lors de la suppression de la matière première.");
                    setLoading(false);
                });
        }
    };
    return (
        <Layout>
            <div className="matiere-premiere-details-container">
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
                        <Tab label="Liste des matières premières" />
                        <Tab label="Ajouter une nouvelle matière" />
                    </Tabs>
                </Box>
                <div className="matiere-premiere-details-content">
                    {/* Onglet 1: Liste des matières premières */}
                    <CustomTabPanel value={value} index={0}>
                        <div className="matiere-list-section">
                            <h2 className="titre">Liste des matières premières</h2>
                            <button className="buttons-container" onClick={handleOpenFilters}>Ouvrir les filtres</button>
                            {/* Popup de filtres */}
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
                                    <h3>Fournisseur:</h3>
                                    <input
                                        type="text"
                                        placeholder="Fournisseur"
                                        value={selectedFournisseur}
                                        onChange={handleFournisseurChange}
                                        className="search-input"
                                    />
                                    <h3>Fabricant:</h3>
                                    <input
                                        type="text"
                                        placeholder="Fabricant"
                                        value={selectedFabricant}
                                        onChange={handleFabricantChange}
                                        className="search-input"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <button className="buttons-container" onClick={handleCloseFilters}>Fermer</button>
                                </DialogActions>
                            </Dialog>

                            <input
                                type="text"
                                placeholder="Entrez le code de la matière première"
                                value={code}
                                onChange={handleInputChange}
                                className="search-input"
                            />
                            {filteredMatiereList.length > 0 && (
                                <div className="dropdowns">
                                    {filteredMatiereList.map(matiere => (
                                        <div
                                            key={matiere.code}
                                            onClick={() => handleSelectMatiere(matiere.code)}
                                            className="dropdowns-item"
                                        >
                                            {matiere.code} - {matiere.article}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {loading && <div>Chargement...</div>}
                            {error && <div className="error-message">{error}</div>}
                            {matiere && (
                                <div className="details-container">
                                    <div className="general-info">
                                        <div className="section-header">Information générale</div>
                                        <div className="details-grid">
                                            <div className="detail-item">
                                                <span className="label">Code:</span> {matiere.code}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Article:</span> {matiere.article}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Fournisseur:</span> {matiere.fournisseur}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Fabricant:</span> {matiere.fabricant}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">N° Famille:</span> {matiere.nfamille}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Observation:</span> {matiere.observation}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Categorie:</span> {matiere.categorie.libelle}
                                            </div>
                                            <div className="detail-item">
                                                <span
                                                    className="label">Date de réception:</span> {matiere.dateReception}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Provenance:</span> {matiere.provenance}
                                            </div>
                                            <div className="detail-item">
                                                <span
                                                    className="label">Nature du produit:</span> {matiere.natureProduit}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Désignation:</span> {matiere.designation}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Code ERP:</span> {matiere.codeERP}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Numéro de lot:</span> {matiere.numLot}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">DLC:</span> {matiere.dlc}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Quantité:</span> {matiere.quantite}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="analysis-info">
                                        <div className="section-header">Spécifications:</div>
                                        <div className="details-grid">
                                            <div className="detail-item">
                                                <span className="label">pH:</span> {matiere.ph}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Densité:</span> {matiere.densite}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Aspect:</span> {matiere.aspect}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Propreté:</span> {matiere.proprete}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Apparence:</span> {matiere.apparence}
                                            </div>
                                            <div className="detail-item">
                                                <span
                                                    className="label">Indice de réfraction:</span> {matiere.indiceRefraction}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">MMA:</span> {matiere.MMA}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">MAC:</span> {matiere.MAC}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">MANT:</span> {matiere.MANT}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Couleur:</span> {matiere.couleur}
                                            </div>
                                            <div className="detail-item">
                                                <span
                                                    className="label">Echelle d'intensité:</span> {matiere.echelleIntensite}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Quantité dégagée:</span> {matiere.quantiteDeg}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Code couleur:</span> {matiere.codeCouleur}
                                            </div>
                                            <div className="detail-item">
                                                <span
                                                    className="label">Décision observation:</span> {matiere.decisionObservation}
                                            </div>
                                            <div className="detail-item">
                                                <span className="label">Arrivage numéro:</span> {matiere.arrivageNum}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="buttons-container" onClick={handleUpdateMatiere}>Mettre à
                                            jour
                                        </button>
                                        <button className="buttons-container" onClick={handleDeleteMatiere}>Supprimer
                                        </button>
                                    </div>
                                    <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
                                        <DialogTitle className="dialog-title">Modifier la matière première</DialogTitle>
                                        <DialogContent className="dialog-content">
                                            <form onSubmit={handleUpdateSubmit}>
                                                <div className="form-control">
                                                    <label>Article</label>
                                                    <input
                                                        type="text"
                                                        name="article"
                                                        value={updatedMatiere.article}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Fabricant</label>
                                                    <input
                                                        type="text"
                                                        name="fabricant"
                                                        value={updatedMatiere.fabricant}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Fournisseur</label>
                                                    <input
                                                        type="text"
                                                        name="fournisseur"
                                                        value={updatedMatiere.fournisseur}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Code</label>
                                                    <input
                                                        type="text"
                                                        name="code"
                                                        value={updatedMatiere.code}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Observation</label>
                                                    <textarea
                                                        name="observation"
                                                        value={updatedMatiere.observation}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Famille</label>
                                                    <input
                                                        type="number"
                                                        name="Nfamille"
                                                        value={updatedMatiere.Nfamille}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Catégorie</label>
                                                    <select name="categorieId" onChange={handleUpdateChange}
                                                            value={updatedMatiere.categorie.id} required>
                                                        <option value="">Sélectionner une catégorie</option>
                                                        {categories.map(categorie => (
                                                            <option key={categorie.id}
                                                                    value={categorie.id}>{categorie.libelle}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label>Date de réception</label>
                                                    <input
                                                        type="date"
                                                        name="dateReception"
                                                        value={updatedMatiere.dateReception}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Provenance</label>
                                                    <input
                                                        type="text"
                                                        name="provenance"
                                                        value={updatedMatiere.provenance}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Nature du produit</label>
                                                    <input
                                                        type="text"
                                                        name="natureProduit"
                                                        value={updatedMatiere.natureProduit}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Désignation</label>
                                                    <input
                                                        type="text"
                                                        name="designation"
                                                        value={updatedMatiere.designation}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Code ERP</label>
                                                    <input
                                                        type="text"
                                                        name="codeERP"
                                                        value={updatedMatiere.codeERP}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Numéro de lot</label>
                                                    <input
                                                        type="text"
                                                        name="numLot"
                                                        value={updatedMatiere.numLot}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>DLC</label>
                                                    <input
                                                        type="text"
                                                        name="dlc"
                                                        value={updatedMatiere.dlc}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Quantité</label>
                                                    <input
                                                        type="number"
                                                        name="quantite"
                                                        value={updatedMatiere.quantite}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>pH</label>
                                                    <input
                                                        type="text"
                                                        name="ph"
                                                        value={updatedMatiere.ph}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Densité</label>
                                                    <input
                                                        type="text"
                                                        name="densite"
                                                        value={updatedMatiere.densite}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Aspect</label>
                                                    <input
                                                        type="text"
                                                        name="aspect"
                                                        value={updatedMatiere.aspect}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Propreté</label>
                                                    <input
                                                        type="text"
                                                        name="proprete"
                                                        value={updatedMatiere.proprete}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Apparence</label>
                                                    <input
                                                        type="text"
                                                        name="apparence"
                                                        value={updatedMatiere.apparence}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Indice de réfraction</label>
                                                    <input
                                                        type="text"
                                                        name="indiceRefraction"
                                                        value={updatedMatiere.indiceRefraction}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>MMA</label>
                                                    <input
                                                        type="text"
                                                        name="MMA"
                                                        value={updatedMatiere.MMA}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>MAC</label>
                                                    <input
                                                        type="text"
                                                        name="MAC"
                                                        value={updatedMatiere.MAC}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>MANT</label>
                                                    <input
                                                        type="text"
                                                        name="MANT"
                                                        value={updatedMatiere.MANT}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Couleur</label>
                                                    <input
                                                        type="text"
                                                        name="couleur"
                                                        value={updatedMatiere.couleur}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Echelle d'intensité</label>
                                                    <input
                                                        type="text"
                                                        name="echelleIntensite"
                                                        value={updatedMatiere.echelleIntensite}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Quantité dégagée</label>
                                                    <input
                                                        type="text"
                                                        name="quantiteDeg"
                                                        value={updatedMatiere.quantiteDeg}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Code couleur</label>
                                                    <input
                                                        type="text"
                                                        name="codeCouleur"
                                                        value={updatedMatiere.codeCouleur}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Décision observation</label>
                                                    <input
                                                        type="text"
                                                        name="decisionObservation"
                                                        value={updatedMatiere.decisionObservation}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label>Arrivage numéro</label>
                                                    <input
                                                        type="text"
                                                        name="arrivageNum"
                                                        value={updatedMatiere.arrivageNum}
                                                        onChange={handleUpdateChange}
                                                    />
                                                </div>
                                                <div className="dialog-actions">
                                                    <button type="submit" className="buttons-form">Enregistrer</button>
                                                    <button type="button" className="buttons-form"
                                                            onClick={handleCloseUpdateDialog}>Annuler
                                                    </button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            )}
                        </div>
                    </CustomTabPanel>
                    {/* Onglet 3: Ajouter une nouvelle matière */}
                    <CustomTabPanel value={value} index={1}>
                        <div className="add-new-section">
                        <h2 className="titre">Ajouter une nouvelle matière première</h2>
                            <form onSubmit={handleNewMatiereSubmit} className="essai-form">
                                <div className="form-section">
                                    <div className="section-header">Information générale</div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Article:</label>
                                            <input
                                                type="text"
                                                name="article"
                                                value={newMatiere.article}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Fabricant:</label>
                                            <input
                                                type="text"
                                                name="fabricant"
                                                value={newMatiere.fabricant}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Fournisseur:</label>
                                            <input
                                                type="text"
                                                name="fournisseur"
                                                value={newMatiere.fournisseur}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Code:</label>
                                            <input
                                                type="text"
                                                name="code"
                                                value={newMatiere.code}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>N° Famille:</label>
                                            <input
                                                type="number"
                                                name="Nfamille"
                                                value={newMatiere.Nfamille}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Observation:</label>
                                            <textarea
                                                name="observation"
                                                value={newMatiere.observation}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Catégorie:</label>
                                            <select
                                                name="categorieId"
                                                value={newMatiere.categorieId}
                                                onChange={handleNewMatiereChange}
                                                className="category-select"
                                            >
                                                <option value="">Sélectionnez une catégorie</option>
                                                {categories.map(category => (
                                                    <option key={category.id} value={category.id}>{category.libelle}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Date de réception</label>
                                            <input
                                                type="date"
                                                name="dateReception"
                                                value={newMatiere.dateReception}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Provenance</label>
                                            <input
                                                type="text"
                                                name="provenance"
                                                value={newMatiere.provenance}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Nature du produit</label>
                                            <input
                                                type="text"
                                                name="natureProduit"
                                                value={newMatiere.natureProduit}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Désignation</label>
                                            <input
                                                type="text"
                                                name="designation"
                                                value={newMatiere.designation}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Code ERP</label>
                                            <input
                                                type="text"
                                                name="codeERP"
                                                value={newMatiere.codeERP}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Numéro de lot</label>
                                            <input
                                                type="text"
                                                name="numLot"
                                                value={newMatiere.numLot}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>DLC</label>
                                            <input
                                                type="text"
                                                name="dlc"
                                                value={newMatiere.dlc}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Quantité</label>
                                            <input
                                                type="text"
                                                name="quantite"
                                                value={newMatiere.quantite}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <div className="section-header">Analyses et caractérisation</div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>pH</label>
                                            <input
                                                type="text"
                                                name="ph"
                                                value={newMatiere.ph}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Densité</label>
                                            <input
                                                type="text"
                                                name="densite"
                                                value={newMatiere.densite}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Aspect</label>
                                            <input
                                                type="text"
                                                name="aspect"
                                                value={newMatiere.aspect}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Propreté</label>
                                            <input
                                                type="text"
                                                name="proprete"
                                                value={newMatiere.proprete}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Apparence</label>
                                            <input
                                                type="text"
                                                name="apparence"
                                                value={newMatiere.apparence}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Indice de réfraction</label>
                                            <input
                                                type="text"
                                                name="indiceRefraction"
                                                value={newMatiere.indiceRefraction}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">

                                        <div className="form-group">
                                            <label>MMA</label>
                                            <input
                                                type="text"
                                                name="MMA"
                                                value={newMatiere.MMA}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>MAC</label>
                                            <input
                                                type="text"
                                                name="MAC"
                                                value={newMatiere.MAC}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>MANT</label>
                                            <input
                                                type="text"
                                                name="MANT"
                                                value={newMatiere.MANT}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Couleur</label>
                                            <input
                                                type="text"
                                                name="couleur"
                                                value={newMatiere.couleur}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Echelle d'intensité</label>
                                            <input
                                                type="text"
                                                name="echelleIntensite"
                                                value={newMatiere.echelleIntensite}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Quantité dégagée</label>
                                            <input
                                                type="text"
                                                name="quantiteDeg"
                                                value={newMatiere.quantiteDeg}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Décision observation</label>
                                            <textarea
                                                name="decisionObservation"
                                                value={newMatiere.decisionObservation}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Arrivage numéro</label>
                                            <input
                                                type="text"
                                                name="arrivageNum"
                                                value={newMatiere.arrivageNum}
                                                onChange={handleNewMatiereChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className="buttons-container" type="submit">Ajouter</button>
                            </form>

                            {loading && <div>Chargement...</div>}
                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </CustomTabPanel>
                </div>
            </div>
        </Layout>
    );
};

export default MatierePremiereDetails;
