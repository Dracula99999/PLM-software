import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Tabs,
    Tab,
} from '@mui/material';
import Layout from './../Layout';
import CustomTabPanel from "../CustomTabPanel";

const ControleQualiteMP = () => {
    const [value, setValue] = useState(0);
    const [newControleQualite, setNewControleQualite] = useState({
        matierePremiereId: '',
        designation: '',
        dateReception: '',
        tailleLot: '',
        unite: '',
        datePrelevement: '',
        dateAnalyse: '',
        operateur: '',
        acceptance: '',
        dateAcceptance: '',
        validatedBy: '',
    });
    const [data, setData] = useState({
        matierePremiereId: '',
        designation: '',
        dateReception: '',
        tailleLot: '',
        unite: '',
        datePrelevement: '',
        dateAnalyse: '',
        operateur: '',
        acceptance: '',
        dateAcceptance: '',
        validatedBy: '',
    });

    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [matiereList, setMatiereList] = useState([]);
    const [filteredMatiereList, setFilteredMatiereList] = useState([]);
    const [code, setCode] = useState('');
    const [modeOperatoire, setModeOperatoire] = useState('');

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
        const { value } = e.target;
        setCode(value);
        filterMatiereList(value);
    };

    const filterMatiereList = (code) => {
        const filteredList = matiereList.filter(matiere =>
            matiere.code.toLowerCase().startsWith(code.toLowerCase())
        );
        setFilteredMatiereList(filteredList);
    };

    const handleSelectMatiere = (selectedCode) => {
        setLoading(true);
        setError(null);
        console.log(`Fetching matierePremiere with code: ${selectedCode}`);

        axios.get(`http://localhost:8084/matierePremieres/code/${selectedCode}`)
            .then(response => {
                const selectedMatiere = response.data;
                console.log('Selected Matiere:', selectedMatiere);

                if (!selectedMatiere || !selectedMatiere.id) {
                    throw new Error('Selected matierePremiere is null or has no id');
                }

                setSelectedMatiere(selectedMatiere);
                setCode(`${selectedMatiere.code} - ${selectedMatiere.article}`);

                // Fetch associated quality control information
                return axios.get(`http://localhost:8087/api/controleQualites/matierePremiere/${selectedMatiere.id}`);
            })
            .then(response => {
                console.log('Quality control details response:', response);
                const controleQualiteData = response.data;
console.log('controleQualiteData  designation:', controleQualiteData.designation)
                const updatedData = {
                    matierePremiereId: controleQualiteData.matierePremiereId,
                    designation: controleQualiteData.designation ,
                    dateReception: controleQualiteData.dateReception ,
                    tailleLot: controleQualiteData.tailleLot ,
                    unite: controleQualiteData.unite ,
                    datePrelevement: controleQualiteData.datePrelevement,
                    dateAnalyse: controleQualiteData.dateAnalyse ,
                    operateur: controleQualiteData.operateur ,
                    acceptance: controleQualiteData.acceptance ,
                    dateAcceptance: controleQualiteData.dateAcceptance ,
                    validatedBy: controleQualiteData.validatedBy ,
                };

                setData(updatedData);
                console.log('controlequalite data:', controleQualiteData);
                console.log('Updated data:', updatedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                setError("Erreur lors de la récupération des détails. Veuillez vérifier le code et réessayer.");
                setLoading(false);
            });
    };
    const handleUpdate = () => {
        axios.put(`http://localhost:8087/api/controleQualites/${data.matierePremiereId}`, data)
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
        axios.delete(`http://localhost:8087/api/controleQualites/${data.matierePremiereId}`)
            .then(response => {
                console.log('Delete successful:', response);
                alert('Contrôle qualité supprimé avec succès.');
                setData({
                    matierePremiereId: '',
                    designation: '',
                    dateReception: '',
                    tailleLot: '',
                    unite: '',
                    datePrelevement: '',
                    dateAnalyse: '',
                    operateur: '',
                    acceptance: '',
                    dateAcceptance: '',
                    validatedBy: '',
                });
                setSelectedMatiere(null);
            })
            .catch(error => {
                console.error('Error deleting controleQualite:', error);
                setError('Erreur lors de la suppression du contrôle qualité.');
            });
    };

    const handleAddControleQualite = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8087/api/controleQualites', newControleQualite)
            .then(response => {
                console.log('Contrôle qualité ajouté avec succès:', response);
                alert('Contrôle qualité ajouté avec succès.');
                // Réinitialiser le formulaire si nécessaire
                setNewControleQualite({
                    matierePremiereId: '',
                    designation: '',
                    dateReception: '',
                    tailleLot: '',
                    unite: '',
                    datePrelevement: '',
                    dateAnalyse: '',
                    operateur: '',
                    acceptance: '',
                    dateAcceptance: '',
                    validatedBy: '',
                });
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du contrôle qualité:', error);
                setError('Erreur lors de l\'ajout du contrôle qualité.');
            });
    };


    return (
        <Layout>
            <Box>
                <div className="matiere-premiere-details-container">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                borderBottom: '1px solid #ccc',
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'transparent',
                                },
                                '.Mui-selected': {
                                    color: '#dd191f',
                                },
                            }}
                        >
                            <Tab label="Liste des contrôles qualités" />
                            <Tab label="Ajouter un contrôle qualité" />
                        </Tabs>
                    </Box>
                    <div className="matiere-premiere-details-content">
                        {/* Onglet 1: Liste des matières premières */}
                        <CustomTabPanel value={value} index={0}>
                            <div className="matiere-list-section">
                                <h2 className="titre">Liste des Contrôles Qualités</h2>
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
                                                <input
                                                    type="text"
                                                    value={selectedMatiere.code}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Article</label>
                                                <input
                                                    type="text"
                                                    value={selectedMatiere.article}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Fabricant</label>
                                                <input
                                                    type="text"
                                                    value={selectedMatiere.fabricant}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Fournisseur</label>
                                                <input
                                                    type="text"
                                                    value={selectedMatiere.fournisseur}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <h3 className>Mode Opératoire</h3>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                value={modeOperatoire}
                                                readOnly
                                            />
                                        </div>
                                        <h3 className="titre">Contrôle Qualité</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Date de Réception</label>
                                                <input
                                                    type="date"
                                                    value={data.dateReception}
                                                    onChange={(e) => setData({...data, dateReception: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Taille du Lot</label>
                                                <input
                                                    type="text"
                                                    value={data.tailleLot}
                                                    onChange={(e) => setData({...data, tailleLot: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Unité</label>
                                                <input
                                                    type="text"
                                                    value={data.unite}
                                                    onChange={(e) => setData({...data, unite: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Date de Prélèvement</label>
                                                <input
                                                    type="date"
                                                    value={data.datePrelevement}
                                                    onChange={(e) => setData({
                                                        ...data,
                                                        datePrelevement: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Date d'Analyse</label>
                                                <input
                                                    type="date"
                                                    value={data.dateAnalyse}
                                                    onChange={(e) => setData({...data, dateAnalyse: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Opérateur</label>
                                                <input
                                                    type="text"
                                                    value={data.operateur}
                                                    onChange={(e) => setData({...data, operateur: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Acceptance</label>
                                                <input
                                                    type="text"
                                                    value={data.acceptance}
                                                    onChange={(e) => setData({...data, acceptance: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Date d'Acceptance</label>
                                                <input
                                                    type="date"
                                                    value={data.dateAcceptance}
                                                    onChange={(e) => setData({...data, dateAcceptance: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Validé Par</label>
                                                <input
                                                    type="text"
                                                    value={data.validatedBy}
                                                    onChange={(e) => setData({...data, validatedBy: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button className="buttons-container" onClick={handleUpdate}>Mettre à jour
                                            </button>
                                            <button className="buttons-container" onClick={handleDelete}>Supprimer
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CustomTabPanel>
                        {/* Onglet 2: Ajouter un contrôle qualité */}
                        <CustomTabPanel value={value} index={1}>
                            <div className="add-controle-qualite-section">
                                <h3 className="titre">Ajouter un Contrôle Qualité</h3>
                                <form onSubmit={handleAddControleQualite}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>ID Matière Première</label>
                                            <input
                                                type="text"
                                                value={newControleQualite.matierePremiereId}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, matierePremiereId: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Désignation</label>
                                            <input
                                                type="text"
                                                value={newControleQualite.designation}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, designation: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Date de Réception</label>
                                            <input
                                                type="date"
                                                value={newControleQualite.dateReception}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, dateReception: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Taille du Lot</label>
                                            <input
                                                type="text"
                                                value={newControleQualite.tailleLot}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, tailleLot: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Unité</label>
                                            <input
                                                type="text"
                                                value={newControleQualite.unite}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, unite: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Date de Prélèvement</label>
                                            <input
                                                type="date"
                                                value={newControleQualite.datePrelevement}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, datePrelevement: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Date d'Analyse</label>
                                            <input
                                                type="date"
                                                value={newControleQualite.dateAnalyse}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, dateAnalyse: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Opérateur</label>
                                            <input
                                                type="text"
                                                value={newControleQualite.operateur}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, operateur: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Acceptation</label>
                                            <input
                                                type="text"
                                                value={newControleQualite.acceptance}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, acceptance: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Date d'Acceptation</label>
                                            <input
                                                type="date"
                                                value={newControleQualite.dateAcceptance}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, dateAcceptance: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Validé par</label>
                                            <input
                                                type="text"
                                                value={newControleQualite.validatedBy}
                                                onChange={(e) => setNewControleQualite({ ...newControleQualite, validatedBy: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="buttons-container">Ajouter</button>
                                    {error && <div className="error-message">{error}</div>}
                                </form>
                            </div>
                        </CustomTabPanel>
                    </div>
                </div>
            </Box>
        </Layout>
    );
};

export default ControleQualiteMP;
