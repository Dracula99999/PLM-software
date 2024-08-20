import React, { useState, useEffect } from 'react';
import './../../styles/formulation.css';
import Layout from '../Layout';
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from 'axios';
import CustomTabPanel from './../CustomTabPanel';
import {useTable} from "react-table";

const Formulation = () => {
    const [value, setValue] = useState(0);
    const [formulation, setFormulation] = useState({
        codeFormule: '',
        nomFormule: '',
        codeEssai: '',
        dateCreation: '',
        tailleEssai: '',
        unite: '',
        formulatorID: '',
        stade: '',
        dateExpiration: '',
        objectif: '',
        notes: '',
        matieresPremieres: []
    });

    const [formulationId, setFormulationId] = useState(null);
    const [formulationsList, setFormulationsList] = useState([]);
    const [selectedFormulation, setSelectedFormulation] = useState(null);
    const [matierePremieres, setMatierePremieres] = useState([]);

    useEffect(() => {
        // Fetch the list of formulations when the component mounts
        axios.get('http://localhost:8089/api/formulations')
            .then(response => {
                setFormulationsList(response.data);
            })
            .catch(error => {
                console.error('Error fetching formulations list:', error);
            });

        axios.get('http://localhost:8084/matierePremieres')
            .then(response => {
                setMatierePremieres(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the MatierePremieres!', error);
            });

    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulation({
            ...formulation,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8089/api/formulations', formulation);
            console.log('Formulation created:', response.data);
            setFormulationId(response.data.id); // Save the formulation ID
            setValue(1); // Switch to the "Associate Raw Materials" tab
        } catch (error) {
            console.error('Error creating the formulation:', error);
        }
    };

    const addMatierePremiere = () => {
        setFormulation({
            ...formulation,
            matieresPremieres: [
                ...formulation.matieresPremieres,
                { id: '', codeMP: '', alertes: '', pourcentage: '', quantite: '' }
            ]
        });
    };

    // const handleMPChange = (index, e) => {
    //     const { name, value } = e.target;
    //     const newMatieresPremieres = [...formulation.matieresPremieres];
    //     newMatieresPremieres[index] = {
    //         ...newMatieresPremieres[index],
    //         [name]: value
    //     };
    //     setFormulation({
    //         ...formulation,
    //         matieresPremieres: newMatieresPremieres
    //     });
    // };

    const handleMPChange = (index, event) => {
        const { name, value } = event.target;
        const newMatieresPremieres = [...formulation.matieresPremieres];
        newMatieresPremieres[index][name] = value;
        setFormulation({ ...formulation, matieresPremieres: newMatieresPremieres });
    };

    const handleMPSave = async () => {
        try {
            for (let mpf of formulation.matieresPremieres) {
                mpf.formulation = { id: formulationId }; // Link the raw material to the formulation
                const response = await axios.post('http://localhost:8089/matierePremiereFormulations', mpf);
                mpf.id = response.data.id; // Update the raw material ID after saving
            }
            setFormulation({
                ...formulation,
                matieresPremieres: [...formulation.matieresPremieres] // Update state with new IDs
            });
            console.log('Raw materials added successfully');
        } catch (error) {
            console.error('Error adding raw materials:', error);
        }
    };

    const handleMPDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8089/matierePremiereFormulations/${id}`);
            console.log('Raw material deleted successfully');
        } catch (error) {
            console.error('Error deleting raw material:', error);
        }
    };

    const removeMatierePremiere = (index) => {
        const mp = formulation.matieresPremieres[index];
        if (mp.id) {
            handleMPDelete(mp.id);
        }

        const newMatieresPremieres = formulation.matieresPremieres.filter((_, i) => i !== index);
        setFormulation({
            ...formulation,
            matieresPremieres: newMatieresPremieres
        });
    };

    const handleFormulationClick = (formulationId) => {
        axios.get(`http://localhost:8089/api/formulations/${formulationId}`)
            .then(response => {
                setSelectedFormulation(response.data);
                setValue(2); // Switch to the "Formulation Details" tab
            })
            .catch(error => {
                console.error('Error fetching formulation details:', error);
            });
    };

    return (
        <Layout>
            <div className="matiere-premiere-details-container">
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        sx={{
                            borderBottom: '1px solid #ccc',
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'transparent',
                            },
                            '.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected ': {
                                color: '#dd191f',
                            },
                        }}
                    >
                        <Tab label="Ajouter une nouvelle Formule"/>
                        <Tab label="Associer Matières Premières"/>
                        <Tab label="Liste des Formules" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} hidden={value !== 0} index={0}>
                    <form className="essai-form" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <div className="section-header">Info Formule</div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Code Formule</label>
                                    <input
                                        type="text"
                                        name="codeFormule"
                                        value={formulation.codeFormule}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nom Formule</label>
                                    <input
                                        type="text"
                                        name="nomFormule"
                                        value={formulation.nomFormule}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="section-header">Informations Essai</div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Code Essai</label>
                                    <input
                                        type="text"
                                        name="codeEssai"
                                        value={formulation.codeEssai}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date de création</label>
                                    <input
                                        type="date"
                                        name="dateCreation"
                                        value={formulation.dateCreation}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Formulateur ID</label>
                                    <input
                                        type="text"
                                        name="formulatorID"
                                        value={formulation.formulatorID}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Taille Essai</label>
                                    <input
                                        type="number"
                                        name="tailleEssai"
                                        value={formulation.tailleEssai}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Unité</label>
                                    <input
                                        type="text"
                                        name="unite"
                                        value={formulation.unite}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Stade Essai</label>
                                    <input
                                        type="text"
                                        name="stade"
                                        value={formulation.stade}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date d'Expiration</label>
                                    <input
                                        type="date"
                                        name="dateExpiration"
                                        value={formulation.dateExpiration}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="section-header">Objectifs</div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Objectif</label>
                                    <input
                                        type="text"
                                        name="objectif"
                                        value={formulation.objectif}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="section-header">Notes</div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Notes</label>
                                    <input
                                        type="text"
                                        name="notes"
                                        value={formulation.notes}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="cancel-btn">Annuler</button>
                            <button type="submit" className="submit-btn">Enregistrer</button>
                        </div>
                    </form>
                </CustomTabPanel>
                <CustomTabPanel value={value} hidden={value !== 1} index={1}>

                    <div className="form-section">
                        {/* Affichage des détails de la formule */}
                        <div className="formulation-details">
                            <h3 className="titre">Détails de la Formule</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Code Formule:</label>
                                    <input
                                        type="text"
                                        name="codeFormulation"
                                        value={formulation.codeFormule}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nom Formule:</label>
                                    <input
                                        type="text"
                                        name="nomFormulation"
                                        value={formulation.nomFormule}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Code Essai:</label>
                                    <input
                                        type="text"
                                        name="codeEssai"
                                        value={formulation.codeEssai}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date de Création:</label>
                                    <input
                                        type="date"
                                        name="dateCreation"
                                        value={formulation.dateCreation}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Formulateur ID:</label>
                                    <input
                                        type="text"
                                        name="formulatorID"
                                        value={formulation.formulatorID}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Stade:</label>
                                    <input
                                        type="text"
                                        name="stade"
                                        value={formulation.stade}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date d'Expiration:</label>
                                    <input
                                        type="date"
                                        name="dateExpiration"
                                        value={formulation.dateExpiration}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Objectif:</label>
                                    <input
                                        type="text"
                                        name="objectif"
                                        value={formulation.objectif}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Notes:</label>
                                    <input
                                        type="text"
                                        name="notes"
                                        value={formulation.notes}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-section">
                        {/* Gestion des matières premières */}
                        <div className="gestion-matieres-premieres">
                            <div className="gestion-matieres-premieres">
                                <h3>Gestion des Matières Premières</h3>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Code Matière Première</th>
                                        <th>Alertes</th>
                                        <th>Pourcentage</th>
                                        <th>Quantité</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {formulation.matieresPremieres.map((mp, index) => (
                                            <tr key={index}>
                                                <td></td>
                                                <td>
                                                <select
                                                    name="codeMP"
                                                    value={mp.codeMP}
                                                    onChange={(e) => handleMPChange(index, e)}
                                                >
                                                    <option value="">Select Matière Première</option>
                                                    {matierePremieres.map((matiere) => (
                                                        <option key={matiere.code} value={matiere.code}>
                                                            {matiere.code} - {matiere.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="alertes"
                                                    value={mp.alertes}
                                                    onChange={(e) => handleMPChange(index, e)}
                                                    placeholder="Alertes"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="pourcentage"
                                                    value={mp.pourcentage}
                                                    onChange={(e) => handleMPChange(index, e)}
                                                    placeholder="Pourcentage"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="quantite"
                                                    value={mp.quantite}
                                                    onChange={(e) => handleMPChange(index, e)}
                                                    placeholder="Quantité"
                                                />
                                            </td>
                                            <td>
                                                <button type="button" className="submit-btn"
                                                        onClick={() => removeMatierePremiere(index)}>Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <button type="button" className="submit-btn" onClick={addMatierePremiere}>Ajouter
                                </button>
                                <button type="button" className="submit-btn" onClick={handleMPSave}>Enregistrer
                                </button>

                            </div>
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} hidden={value !== 2} index={2}>
                    <div className="form-section">
                        <h3 className="titre">Liste des Formules</h3>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Code Formule</th>
                                <th>Nom Formule</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {formulationsList.map((form, index) => (
                                <tr key={form.id}>
                                    <td>{form.id}</td>
                                    <td>{form.codeFormule}</td>
                                    <td>{form.nomFormule}</td>
                                    <td>
                                        <button className="submit-btn" onClick={() => handleFormulationClick(form.id)}>Voir Détails</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="form-section">
                        {selectedFormulation && (
                            <div className="formulation-details">
                                <h3 className="titre">Détails de la Formule</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Code Formule:</label>
                                        <input
                                            type="text"
                                            name="codeFormule"
                                            value={selectedFormulation.codeFormule}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nom Formule:</label>
                                        <input
                                            type="text"
                                            name="nomFormule"
                                            value={selectedFormulation.nomFormule}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Code Essai:</label>
                                        <input
                                            type="text"
                                            name="codeEssai"
                                            value={selectedFormulation.codeEssai}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date de Création:</label>
                                        <input
                                            type="date"
                                            name="dateCreation"
                                            value={selectedFormulation.dateCreation}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Formulateur ID:</label>
                                        <input
                                            type="text"
                                            name="formulatorID"
                                            value={selectedFormulation.formulatorID}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Stade:</label>
                                        <input
                                            type="text"
                                            name="stade"
                                            value={selectedFormulation.stade}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date d'Expiration:</label>
                                        <input
                                            type="date"
                                            name="dateExpiration"
                                            value={selectedFormulation.dateExpiration}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Objectif:</label>
                                        <input
                                            type="text"
                                            name="objectif"
                                            value={selectedFormulation.objectif}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Notes:</label>
                                        <textarea
                                            name="notes"
                                            value={selectedFormulation.notes}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <h4>Matières Premières Associées:</h4>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Code MP</th>
                                            <th>Alertes</th>
                                            <th>Pourcentage</th>
                                            <th>Quantité</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {selectedFormulation.matieresPremieres.map((mp, index) => (
                                            <tr key={index}>
                                                <td>{mp.codeMP}</td>
                                                <td>{mp.alertes}</td>
                                                <td>{mp.pourcentage}</td>
                                                <td>{mp.quantite}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </CustomTabPanel>
            </div>
        </Layout>
    );
};

export default Formulation;