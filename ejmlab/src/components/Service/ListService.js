import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import './../../styles/ServiceDetails.css'; // Ensure this path is correct

const ListService = ({ onSelectService }) => {
    const [searchTerms, setSearchTerms] = useState({
        nom: '',
        tache: ''
    });
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8086/services');
                setServices(response.data);
                setFilteredServices(response.data); // Initialize filteredServices with all services
            } catch (error) {
                console.error('Erreur lors de la récupération des services:', error);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const lowerCaseTerms = {
            nom: searchTerms.nom.toLowerCase(),
            tache: searchTerms.tache.toLowerCase()
        };

        const filtered = services.filter(service => {
            const nameMatches = service.nom && service.nom.toLowerCase().includes(lowerCaseTerms.nom);
            const tasksMatch = service.taches && service.taches.some(tache =>
                tache.description && tache.description.toLowerCase().includes(lowerCaseTerms.tache)
            );
            return (nameMatches || tasksMatch);
        });
        setFilteredServices(filtered);
    }, [searchTerms, services]);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchTerms(prevTerms => ({
            ...prevTerms,
            [name]: value
        }));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="service-list-section">
            <h2 className="titre">Liste des Services</h2>
            <button className="buttons-container" onClick={handleClickOpen}>Configurer les filtres</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle  className="dialog-title">Configurer les filtres</DialogTitle>
                <DialogContent className="dialog-content" >
                    <div className="search-criteria">
                        <h3>Nom Service:</h3>
                        <input
                            margin="dense"
                            placeholder="Nom du Service"
                            name="nom"
                            value={searchTerms.nom}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                        <h3>Taches:</h3>

                        <input
                            margin="dense"
                            placeholder="Description de Tâche"
                            name="tache"
                            value={searchTerms.tache}
                            onChange={handleSearchChange}
                            fullWidth
                            className="search-input"
                        />
                    </div>
                </DialogContent>
                <DialogActions  className="dialog-actions">
                    <button onClick={handleClose}>Fermer</button>
                </DialogActions>
            </Dialog>
            <div className="search-input-container">
                <input
                    type="text"
                    placeholder="Rechercher par Nom de Service"
                    name="nom"
                    value={searchTerms.nom}
                    onChange={handleSearchChange}
                    fullWidth
                    className="search-input"
                />
            </div>
            {filteredServices.length > 0 && (
                <div className="dropdown">
                    {filteredServices.map(service => (
                        <div
                            key={service.id}
                            onClick={() => onSelectService(service)}
                            className="dropdown-item"
                        >
                            {service.nom}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListService;
