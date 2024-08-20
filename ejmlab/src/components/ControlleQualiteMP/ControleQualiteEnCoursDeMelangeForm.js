import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab, TextField,MenuItem, Select } from '@mui/material';
import CustomTabPanel from './../CustomTabPanel';
import Layout from './../Layout';


const ControleQualiteEnCoursDeMelangeForm = () => {
    const [value, setValue] = useState(1);
    const [matierePremieres, setMatierePremieres] = useState([]);
    const [data, setData] = useState({
        matierePremiereId: '',
        designation: '',
        dateDebutControl: '',
        malaxeur: '',
        numeroLot: '',
        temperatureValidation: '',
        parametreMesure: {
            id: '',
            dateEtHeure: '',
            natureEchantillon: '',
            viscosite: '',
            temperature: '',
            odeur: '',
            couleur: '',
            aspect: '',
            densite: '',
            detergentPourcentage: '',
            DPH: '',
            alcalilibre: '',
            autre: '',
            observations: '',
            pH: ''
        },
        acceptance: '',
        visaTechCQ: '',
        visaRespCQ: '',
        dateCloture: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const [matiereList, setMatiereList] = useState([]);
    const [filteredMatiereList, setFilteredMatiereList] = useState([]);
    const [code, setCode] = useState('');
    const [modeOperatoire, setModeOperatoire] = useState('');
    const [controleList, setControleList] = useState([]);
    const [selectedControle, setSelectedControle] = useState(null);
    // Chargement des matières premières
    useEffect(() => {
        axios.get('http://localhost:8084/matierePremieres')
            .then(response => {
                setMatiereList(response.data);
                setFilteredMatiereList(response.data);
            })
            .catch(() => {
                setError("Erreur lors de la récupération de la liste des matières premières.");
            });
    }, []);

    useEffect(() => {
        if (data.matierePremiereId) {
            const selected = matiereList.find(matiere => matiere.id === data.matierePremiereId);
            setSelectedMatiere(selected);

            if (selected) {
                axios.get(`http://localhost:8087/api/modeOperatoires/${selected.id}`)
                    .then(response => setModeOperatoire(response.data.description || ''))
                    .catch(() => setError("Erreur lors de la récupération du mode opératoire."));
            }
        } else {
            setSelectedMatiere(null);
            setModeOperatoire('');
        }
    }, [data.matierePremiereId, matiereList]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('parametreMesure.')) {
            // Si le champ appartient à parametreMesure
            const parametreName = name.substring('parametreMesure.'.length);
            setData(prevData => ({
                ...prevData,
                parametreMesure: {
                    ...prevData.parametreMesure,
                    [parametreName]: value
                }
            }));
        } else {
            // Sinon, c'est un champ direct
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSelectMatiereS = (selectedCode) => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:8084/matierePremieres/code/${selectedCode}`)
            .then(response => {
                const selectedMatiere = response.data;
                if (!selectedMatiere || !selectedMatiere.id) {
                    throw new Error('Selected matierePremiere is null or has no id');
                }
                setSelectedMatiere(selectedMatiere);
                setCode(`${selectedMatiere.code} - ${selectedMatiere.article}`);

                return axios.get(`http://localhost:8087/controleQualiteEnCoursDeMelange/matierePremiere/${selectedMatiere.id}`);
            })
            .then(response => {
                const controleQualiteData = response.data;
                setData({
                    matierePremiereId: controleQualiteData.matierePremiereId || '',
                    designation: controleQualiteData.designation || '',
                    dateDebutControl: controleQualiteData.dateDebutControl || '',
                    malaxeur: controleQualiteData.malaxeur || '',
                    numeroLot: controleQualiteData.numeroLot || '',
                    temperatureValidation: controleQualiteData.temperatureValidation || '',
                    parametreMesure: controleQualiteData.parametreMesure || '',
                    acceptance: controleQualiteData.acceptance || '',
                    visaTechCQ: controleQualiteData.visaTechCQ || '',
                    visaRespCQ: controleQualiteData.visaRespCQ || '',
                    dateCloture: controleQualiteData.dateCloture|| ''
                });
                setLoading(false);
                console.log('Controle qualité en cours de mélange:', controleQualiteData);
                console.log('Paramètres de mesure:', controleQualiteData.parametreMesure);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                setError("Erreur lors de la récupération des détails. Veuillez vérifier le code et réessayer.");
                setLoading(false);
            });
    };
    const handleSelectMatiere = (selectedCode) => {
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:8084/matierePremieres/code/${selectedCode}`)
            .then(response => {
                const selectedMatiere = response.data;
                if (!selectedMatiere || !selectedMatiere.id) {
                    throw new Error('Selected matierePremiere is null or has no id');
                }
                setSelectedMatiere(selectedMatiere);
                setCode(`${selectedMatiere.code} - ${selectedMatiere.article}`);

                // Charger les contrôles qualité pour la matière première sélectionnée
                return axios.get(`http://localhost:8087/controleQualiteEnCoursDeMelange/matierePremiere/${selectedMatiere.id}`);
            })
            .then(response => {
                setControleList(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                setError("Erreur lors de la récupération des détails. Veuillez vérifier le code et réessayer.");
                setLoading(false);
            });
    };

    const handleSelectControle = (controleId) => {
        setLoading(true);
        setError(null);

        axios.get(`http://localhost:8087/controleQualiteEnCoursDeMelange/${controleId}`)
            .then(response => {
                const controleData = response.data;
                setData({
                    matierePremiereId: controleData.matierePremiereId || '',
                    designation: controleData.designation || '',
                    dateDebutControl: controleData.dateDebutControl || '',
                    malaxeur: controleData.malaxeur || '',
                    numeroLot: controleData.numeroLot || '',
                    temperatureValidation: controleData.temperatureValidation || '',
                    parametreMesure: controleData.parametreMesure || '',
                    acceptance: controleData.acceptance || '',
                    visaTechCQ: controleData.visaTechCQ || '',
                    visaRespCQ: controleData.visaRespCQ || '',
                    dateCloture: controleData.dateCloture || ''
                });
                setSelectedControle(controleData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching controle details:', error);
                setError("Erreur lors de la récupération des détails du contrôle qualité.");
                setLoading(false);
            });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Préparer les données à envoyer
        const dataToSend = {
            matierePremiereId: data.matierePremiereId,
            designation: data.designation,
            dateDebutControl: data.dateDebutControl,
            malaxeur: data.malaxeur,
            numeroLot: data.numeroLot,
            temperatureValidation: parseFloat(data.temperatureValidation) || null, // Utilisation de `|| null` pour gérer les valeurs invalides
            acceptance: data.acceptance,
            visaTechCQ: data.visaTechCQ,
            visaRespCQ: data.visaRespCQ,
            dateCloture: data.dateCloture,
            parametreMesure: {
                id: data.parametreMesure.id || null, // Ajout de `|| null` pour gérer les valeurs invalides
                dateEtHeure: data.parametreMesure.dateEtHeure,
                natureEchantillon: data.parametreMesure.natureEchantillon,
                viscosite: parseFloat(data.parametreMesure.viscosite) || null,
                temperature: parseFloat(data.parametreMesure.temperature) || null,
                odeur: data.parametreMesure.odeur,
                couleur: data.parametreMesure.couleur,
                aspect: data.parametreMesure.aspect,
                densite: parseFloat(data.parametreMesure.densite) || null,
                detergentPourcentage: parseFloat(data.parametreMesure.detergentPourcentage) || null,
                DPH: parseFloat(data.parametreMesure.DPH) || null,
                alcalilibre: parseFloat(data.parametreMesure.alcalilibre) || null,
                autre: data.parametreMesure.autre,
                observations: data.parametreMesure.observations,
                pH: parseFloat(data.parametreMesure.pH) || null
            }
        };

        console.log('Data to send:', dataToSend);
        console.log('Data:', data);

        try {
            // Envoi des données au serveur
            await axios.post('http://localhost:8087/controleQualiteEnCoursDeMelange', dataToSend);
            // Gérer le succès ici (e.g., afficher un message de confirmation, réinitialiser le formulaire, etc.)
            console.log('Contrôle qualité enregistré avec succès.');
        } catch (error) {
            // Gestion des erreurs
            console.error('Erreur lors de l\'enregistrement du ContrôleQualiteEnCoursDeMelange:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdate = (e) => {
        console.log('data:', data.matierePremiereId);
        axios.put(`http://localhost:8087/controleQualiteEnCoursDeMelange/${data.matierePremiereId}`, data)
            .then(response => {
                console.log('Update successful:', response);
                alert('Contrôle qualité mis à jour avec succès.');
            })
            .catch(error => {
                console.error('Error updating controleQualite:', error);
                setError('Erreur lors de la mise à jour du contrôle qualité.');
            });
    };

    const handleDelete = () => {
        if (!data.matierePremiereId) {
            setError('Aucune matière première sélectionnée pour la suppression.');
            return;
        }
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contrôle qualité?')) {
            axios.delete(`http://localhost:8087/controleQualiteEnCoursDeMelange/${data.matierePremiereId}`)
                .then(() => {
                    alert('Contrôle qualité en cours de mélange supprimé avec succès!');

                    setData({
                        matierePremiereId: '',
                        designation: '',
                        dateDebutControl: '',
                        malaxeur: '',
                        numeroLot: '',
                        temperatureValidation: '',
                        parametreMesure: '',
                        acceptance: '',
                        visaTechCQ: '',
                        visaRespCQ: '',
                        dateCloture: ''
                    });
                    setCode('');
                    setSelectedMatiere(null);
                    setModeOperatoire('');
                })
                .catch(() => {
                    setError('Erreur lors de la suppression du contrôle qualité');
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
                        <Tab label="Liste des contrôles qualité" />
                        <Tab label="Ajouter un contrôle qualité" />
                    </Tabs>
                </Box>

                <div className="matiere-premiere-details-content">
                    {/* Onglet 1: Liste des contrôles qualité */}
                    <CustomTabPanel value={value} index={0}>
                        <div className="matiere-list-section">
                            <h2 className="titre">Liste des Contrôles Qualités en cours de mélange </h2>
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
                            {selectedMatiere && (
                                <>
                                    <h3 className="titre">Détails de la Matière Première</h3>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Code</label>
                                            <TextField
                                                fullWidth
                                                value={selectedMatiere.code}
                                                InputProps={{readOnly: true}}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Article</label>
                                            <TextField
                                                fullWidth
                                                value={selectedMatiere.article}
                                                InputProps={{readOnly: true}}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Fabricant</label>
                                            <TextField
                                                fullWidth
                                                value={selectedMatiere.fabricant}
                                                InputProps={{readOnly: true}}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Fournisseur</label>
                                            <TextField
                                                fullWidth
                                                value={selectedMatiere.fournisseur}
                                                InputProps={{readOnly: true}}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Mode opératoire</label>
                                            <TextField
                                                fullWidth
                                                value={modeOperatoire}
                                                InputProps={{readOnly: true}}
                                            />
                                        </div>
                                    </div>
                                    <h3 className="titre">Liste des Contrôles Qualités En cours de mélange</h3>
                                    {controleList.length > 0 ? (
                                        <div className="dropdowns">
                                            {controleList.map(controle => (
                                                <div
                                                    key={controle.id}
                                                    onClick={() => handleSelectControle(controle.id)}
                                                    className="dropdowns-item"
                                                >
                                                    {controle.designation} - {controle.dateDebutControl}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div>Aucun contrôle qualité trouvé.</div>
                                    )}

                                    {selectedControle && (
                                        <>
                                            <h3 className="titre">Détails du Contrôle Qualité</h3>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Désignation</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.designation}
                                                        onChange={(e) => setData({...data, designation: e.target.value})}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Date Début Contrôle</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.dateDebutControl}
                                                        onChange={(e) => setData({...data, dateDebutControl: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Malaxeur</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.malaxeur}
                                                        onChange={(e) => setData({...data, malaxeur: e.target.value})}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Numéro de Lot</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.numeroLot}
                                                        onChange={(e) => setData({...data, numeroLot: e.target.value})}
                                                    />
                                                </div>
                                            </div>


                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Température Validation</label>
                                                <TextField
                                                    fullWidth
                                                    value={data.temperatureValidation}
                                                    onChange={(e) => setData({...data, temperatureValidation: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Acceptance</label>
                                                <TextField
                                                    fullWidth
                                                    value={data.acceptance}
                                                    onChange={(e) => setData({...data, acceptance: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Visa Technique CQ</label>
                                                <TextField
                                                    fullWidth
                                                    value={data.visaTechCQ}
                                                    onChange={(e) => setData({...data, visaTechCQ: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Visa Responsable CQ</label>
                                                <TextField
                                                    fullWidth
                                                    value={data.visaRespCQ}
                                                    onChange={(e) => setData({...data, visaRespCQ: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Date Clôture</label>
                                                <TextField
                                                    fullWidth
                                                    value={data.dateCloture}
                                                    onChange={(e) => setData({...data, dateCloture: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <h3 className="titre">Paramètres de Mesure</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>dateEtHeure</label>
                                                <TextField
                                                    fullWidth
                                                    value={data.parametreMesure.dateEtHeure}
                                                    InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>natureEchantillon</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.natureEchantillon}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>viscosite</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.viscosite}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>temperature</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.temperature}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>odeur</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.odeur}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>couleur</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.couleur}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>aspect</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.aspect}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>densite</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.densite}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>

                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>detergentPourcentage</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.detergentPourcentage}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>alcalilibre</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.alcalilibre}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>DpH</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.dph}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>ph</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.ph}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label>Autre</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.autre}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Observation</label>
                                                    <TextField
                                                        fullWidth
                                                        value={data.parametreMesure.observation}
                                                        InputProps={{readOnly: true}}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <button className="buttons-container" onClick={handleDelete}>Supprimer
                                                </button>
                                                {error && <div className="error-message">{error}</div>}
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </CustomTabPanel>

                    {/* Onglet 2: Ajouter un contrôle qualité */}

                    <CustomTabPanel value={value} index={1}>
                        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <h3 className="titre">Ajouter un Contrôle Qualité</h3>
                            <div className="form-row">
                                <div className="form-group">

                                    <label>Matière Première</label>
                                    <Select
                                        labelId="matiere-premiere-label"
                                        id="matiere-premiere-select"
                                        value={data.matierePremiereId}
                                        onChange={handleInputChange}
                                        name="matierePremiereId"
                                        fullWidth

                                    >
                                        {matiereList.map(matiere => (
                                            <MenuItem key={matiere.id} value={matiere.id}>
                                                {matiere.code} - {matiere.article}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </div>
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input
                                        type="text"
                                        fullWidth
                                        name="designation"
                                        value={data.designation}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date Début Contrôle</label>
                                    <input
                                        name="dateDebutControl"
                                        type="date"
                                        value={data.dateDebutControl}
                                        onChange={handleInputChange}
                                        InputLabelProps={{shrink: true}}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Malaxeur</label>
                                    <input
                                        type="text"
                                        name="malaxeur"
                                        value={data.malaxeur}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Numéro de Lot</label>
                                    <input
                                        type="text"
                                        name="numeroLot"
                                        value={data.numeroLot}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Température Validation</label>
                                    <input
                                        name="temperatureValidation"
                                        type="number"
                                        value={data.temperatureValidation}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Acceptance</label>
                                    <input
                                        type="text"
                                        name="acceptance"
                                        value={data.acceptance}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Visa Technique CQ</label>
                                    <input
                                        type="text"
                                        name="visaTechCQ"
                                        value={data.visaTechCQ}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Visa Responsable CQ</label>
                                    <input
                                        type="text"
                                        name="visaRespCQ"
                                        value={data.visaRespCQ}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date Clôture</label>
                                    <input
                                        name="dateCloture"
                                        type="date"
                                        value={data.dateCloture}
                                        onChange={handleInputChange}
                                        InputLabelProps={{shrink: true}}

                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    {/* For ParametreMesure fields, you might want to add another section or tab */}
                                    <label>Nature echantillon</label>
                                    <input
                                        type="text"
                                        name="parametreMesure.natureEchantillon"
                                        value={data.parametreMesure.natureEchantillon}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>pH</label>
                                    <input
                                        name="parametreMesure.pH"
                                        type="number"
                                        value={data.parametreMesure.pH}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Viscosité</label>
                                    <input
                                        name="parametreMesure.viscosite"
                                        type="number"
                                        value={data.parametreMesure.viscosite}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Température</label>
                                    <input
                                        name="parametreMesure.temperature"
                                        type="number"
                                        value={data.parametreMesure.temperature}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Odeur</label>
                                    <input
                                        type="text"
                                        name="parametreMesure.odeur"
                                        value={data.parametreMesure.odeur}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Couleur</label>
                                    <input
                                        type="text"
                                        name="parametreMesure.couleur"
                                        value={data.parametreMesure.couleur}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Aspect</label>
                                    <input
                                        type="text"
                                        name="parametreMesure.aspect"
                                        value={data.parametreMesure.aspect}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Densité</label>
                                    <input
                                        name="parametreMesure.densite"
                                        type="number"
                                        value={data.parametreMesure.densite}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Détergent Pourcentage</label>
                                    <input
                                        name="parametreMesure.detergentPourcentage"
                                        type="number"
                                        value={data.parametreMesure.detergentPourcentage}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>DPH</label>
                                    <input
                                        name="parametreMesure.DPH"
                                        type="number"
                                        value={data.parametreMesure.DPH}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Alcalilibre</label>
                                    <input
                                        name="parametreMesure.alcalilibre"
                                        type="number"
                                        value={data.parametreMesure.alcalilibre}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Autre</label>
                                    <input
                                        type="text"
                                        name="parametreMesure.autre"
                                        value={data.parametreMesure.autre}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Observations</label>
                                    <input
                                        type="text"
                                        name="parametreMesure.observations"
                                        value={data.parametreMesure.observations}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div>
                                <button className="buttons-container"  type="submit">Enregistrer
                                </button>
                            </div>
                        </Box>
                    </CustomTabPanel>

                </div>
            </div>
        </Layout>
);
};

export default ControleQualiteEnCoursDeMelangeForm;
