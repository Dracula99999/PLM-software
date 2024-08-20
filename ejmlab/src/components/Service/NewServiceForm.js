import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './../../styles/NewProjectForm.css'; // Assurez-vous d'importer le fichier CSS

const NewServiceForm = () => {
    const [serviceName, setServiceName] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState(null);

    const handleCreateService = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8086/CreateServices', { nom: serviceName });
            alert('Service créé avec succès !');
            setServiceName('');
        } catch (error) {
            console.error('Erreur lors de la création du service:', error);
            alert('Erreur lors de la création du service: ' + error.message);
        }
    };

    const handleUpdateService = async (event) => {
        event.preventDefault();
        if (selectedService) {
            try {
                await axios.put(`http://localhost:8086/services/${selectedService.id}`, { nom: serviceName });
                alert('Service mis à jour avec succès !');
                setSelectedService(null);
                setServiceName('');
            } catch (error) {
                console.error('Erreur lors de la mise à jour du service:', error);
                alert('Erreur lors de la mise à jour du service: ' + error.message);
            }
        } else {
            alert('Aucun service sélectionné pour la mise à jour.');
        }
    };

    const handleDeleteService = async () => {
        if (selectedService) {
            try {
                await axios.delete(`http://localhost:8086/services/${selectedService.id}`);
                alert('Service supprimé avec succès !');
                setSelectedService(null);
                setServiceName('');
            } catch (error) {
                console.error('Erreur lors de la suppression du service:', error);
                alert('Erreur lors de la suppression du service: ' + error.message);
            }
        } else {
            alert('Aucun service sélectionné pour la suppression.');
        }
    };

    return (
        <div className="new-service-form">
            <h2 className="titre" >{selectedService ? 'Mettre à jour un Service' : 'Créer un Nouveau Service'}</h2>
            <form onSubmit={selectedService ? handleUpdateService : handleCreateService}>
                <Box sx={{ width: '100%' }}>
                    <TextField
                        label="Nom du Service"
                        variant="outlined"
                        fullWidth
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        {selectedService ? 'Mettre à jour' : 'Créer'}
                    </Button>
                    {selectedService && (
                        <button
                            variant="contained"
                            color="secondary"
                            onClick={handleDeleteService}
                            className="buttoncreer"
                        >
                            Supprimer
                        </button>
                    )}
                </Box>
            </form>
        </div>
    );
};

export default NewServiceForm;
