import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import './../../styles/NewProjectForm.css'; // Assurez-vous d'importer le fichier CSS

const NewProjectForm = ({ setValue }) => {
    const [newProjet, setNewProjet] = useState({
        titre: '',
        dateDebut: '',
        dateMiseAJour: '',
        avancement: '',
        dureeDuProjet: '',
        debutReel: '',
        dureeReel: '',
        categorie: '', // Ajout de la catégorie
    });

    const [categories] = useState(['amélioration et dèveloppement-Emballage et Accessoire',
        'amélioration et dèveloppement-étiquette','amélioration et dèveloppement- Emballage plastique',
        'dèveloppement NV produit','amélioration et dèveloppement-Carton'
    ]); // Définition des catégories
    const [error, setError] = useState(null);

    const handleNewProjetChange = (e) => {
        const { name, value } = e.target;
        setNewProjet(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewProjetSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8090/CreateProjets', newProjet)
            .then(response => {
                console.log('Projet créé avec succès:', response.data);
                setNewProjet({
                    titre: '',
                    dateDebut: '',
                    dateMiseAJours: '',
                    avancement: '',
                    dureeDuProjet: '',
                    debutReel: '',
                    dureeReel: '',
                    categorie: '', // Réinitialiser la catégorie
                });
                alert('Projet crée avec sucées');
                setValue(1); // Retourner à l'onglet de la liste des projets
            })
            .catch(error => {
                console.error('Erreur lors de la création du projet:', error);
                setError("Erreur lors de la création du projet.");
            });
    };

    return (
        <div className="new-projet-form">
            <h2 className="titre">Créer un nouveau projet</h2>
            <form onSubmit={handleNewProjetSubmit}>
                <Box sx={{ width: '100%' }}>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Titre:</label>
                            <input
                                type="text"
                                name="titre"
                                placeholder="Titre"
                                value={newProjet.titre}
                                onChange={handleNewProjetChange}
                            />
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Catégorie:</label>
                            <select
                                name="categorie"
                                value={newProjet.categorie}
                                onChange={handleNewProjetChange}
                            >
                                <option value="" disabled>Choisissez une catégorie</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">

                        <div className="form-group">
                            <label className="label">Avancement:</label>
                            <input
                                type="text"
                                name="avancement"
                                placeholder="avancement"
                                value={newProjet.avancement}
                                onChange={handleNewProjetChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Date de début:</label>
                            <input
                                type="date"
                                name="dateDebut"
                                value={newProjet.dateDebut}
                                onChange={handleNewProjetChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Durée du projet:</label>
                            <input
                                type="text"
                                name="dureeDuProjet"
                                placeholder="Durée du projet"
                                value={newProjet.dureeDuProjet}
                                onChange={handleNewProjetChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Début réel:</label>
                            <input
                                type="date"
                                name="debutReel"
                                value={newProjet.debutReel}
                                onChange={handleNewProjetChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label">Durée réelle:</label>
                            <input
                                type="text"
                                name="dureeReel"
                                placeholder="Durée réelle"
                                value={newProjet.dureeReel}
                                onChange={handleNewProjetChange}
                            />
                        </div>
                    </div>

                    <button className="buttoncreer" type="submit">Créer</button>
                </Box>
            </form>
        </div>
    );
};

export default NewProjectForm;