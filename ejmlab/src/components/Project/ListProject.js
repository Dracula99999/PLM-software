import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import './../../styles/ProjetDetails.css';

const ListProject = ({ onSelectProjet }) => {
    const [searchTerms, setSearchTerms] = useState({
        titre: '',
        categorie: '',
        avancement: '',
        id: '',
        dateDebut: '',
        dureeduprojet: '',
        debutreel: '',
        dureereel: '',
    });
    const [projetList, setProjetList] = useState([]);
    const [filteredProjets, setFilteredProjets] = useState([]);
    const [selectedProjet, setSelectedProjet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);

    useEffect(() => {
        const fetchProjets = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8090/projets');
                setProjetList(response.data);
                setFilteredProjets(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des projets');
            } finally {
                setLoading(false);
            }
        };
        fetchProjets();
    }, []);

    useEffect(() => {
        const lowerCaseTerms = Object.keys(searchTerms).reduce((acc, key) => {
            acc[key] = searchTerms[key].toLowerCase();
            return acc;
        }, {});

        const filtered = projetList.filter(projet => {
            return Object.keys(lowerCaseTerms).every(key => {
                const searchTerm = lowerCaseTerms[key];
                if (searchTerm === '') return true;
                switch (key) {
                    case 'titre':
                        return projet.titre.toLowerCase().includes(searchTerm);
                    case 'categorie':
                        return projet.categorie.toLowerCase().includes(searchTerm);
                    case 'avancement':
                        return projet.avancement && projet.avancement.toString().toLowerCase().includes(searchTerm);
                    case 'id':
                        const projectId = parseInt(searchTerm, 10);
                        return !isNaN(projectId) && projet.numero === projectId;
                    case 'dateDebut':
                        return projet.dateDebut && projet.dateDebut.toString().toLowerCase().includes(searchTerm);
                    case 'dureeduprojet':
                        return projet.dureeduplan && projet.dureeduplan.toString().toLowerCase().includes(searchTerm);
                    case 'debutreel':
                        return projet.debutreel && projet.debutreel.toString().toLowerCase().includes(searchTerm);
                    case 'dureereel':
                        return projet.dureereel && projet.dureereel.toString().toLowerCase().includes(searchTerm);
                    default:
                        return true;
                }
            });
        });
        setFilteredProjets(filtered);
    }, [searchTerms, projetList]);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchTerms(prevTerms => ({
            ...prevTerms,
            [name]: value
        }));
    };

    const handleSelectProjetInternal = (projet) => {
        setSelectedProjet(projet);
        onSelectProjet(projet);
    };

    const handleKeyPress = (e, projet) => {
        if (e.key === 'Enter') {
            handleSelectProjetInternal(projet);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:8090/DeleteProjets/${projectId}`);
            setProjetList(prevList => prevList.filter(projet => projet.numero !== projectId));
            setFilteredProjets(prevList => prevList.filter(projet => projet.numero !== projectId));
            handleCloseDeleteDialog();
        } catch (error) {
            console.error('Erreur lors de la suppression du projet', error);
        }
    };

    const handleOpenDeleteDialog = (projet) => {
        setProjectToDelete(projet);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setProjectToDelete(null);
    };

    return (
        <div id="projet-list-section" className="projet-list-section">
            <h2 className="titre">Liste des projets</h2>
            <button className="buttons-container" onClick={handleClickOpen}>Ouvrir les filtres</button>
            <Dialog open={open} onClose={handleClose}>
                <h2 className="titre">Configurer les filtres</h2>
                <DialogContent className="dialog-content">
                    <div className="search-criteria">
                        <h3>Titre:</h3>
                        <input
                            margin="dense"
                            placeholder="Titre"
                            name="titre"
                            value={searchTerms.titre}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                        <h3>Avancement:</h3>
                        <input
                            margin="dense"
                            placeholder="Avancement"
                            name="avancement"
                            value={searchTerms.avancement}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                        <h3>Date de Début:</h3>
                        <input
                            margin="dense"
                            placeholder="Date de Début"
                            name="dateDebut"
                            value={searchTerms.dateDebut}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                        <h3>Durée du Plan:</h3>
                        <input
                            margin="dense"
                            placeholder="Durée du Plan"
                            name="dureeduplan"
                            value={searchTerms.dureeduplan}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                        <h3>Début Réel:</h3>
                        <input
                            margin="dense"
                            placeholder="Début Réel"
                            name="debutreel"
                            value={searchTerms.debutreel}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                        <h3>Durée Réelle:</h3>
                        <TextField
                            margin="dense"
                            placeholder="Durée Réelle"
                            name="dureereel"
                            value={searchTerms.dureereel}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                    </div>
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <button onClick={handleClose}>Fermer</button>
                </DialogActions>
            </Dialog>
            <input
                type="text"
                placeholder="Entrez le categorie du projet"
                name="categorie"
                value={searchTerms.categorie}
                onChange={handleSearchChange}
                className="search-input"
            />
            {filteredProjets.length > 0 && (
                <div className="dropdownss">
                    {filteredProjets.map(projet => (
                        <div
                            key={projet.numero}
                            onClick={() => handleSelectProjetInternal(projet)}
                            className="dropdowns-item"
                        >
                            {projet.numero} - {projet.titre}
                            <button  className="button-container" onClick={(e) => { e.stopPropagation(); handleOpenDeleteDialog(projet); }}>Supprimer</button>
                        </div>
                    ))}
                </div>
            )}
            {deleteDialogOpen && projectToDelete && (
                <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                    <h2 className="titre">Confirmer la suppression</h2>
                    <DialogContent>Voulez-vous vraiment supprimer le projet "{projectToDelete.titre}" ?</DialogContent>
                    <DialogActions>
                        <button  className= "buttons-container" onClick={handleCloseDeleteDialog}>Annuler</button>
                        <button       className= "buttons-container" onClick={() => handleDeleteProject(projectToDelete.numero)}>Supprimer</button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default ListProject;