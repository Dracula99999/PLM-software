import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import './../../styles/ProjetDetails.css'; // Importez le fichier CSS

const DetailService = ({ selectedService, setSelectedService }) => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [serviceToUpdate, setServiceToUpdate] = useState({
        nom: ''
    });

    useEffect(() => {
        if (selectedService) {
            const fetchTasksAndProjects = async () => {
                try {
                    // Fetch tasks associated with the selected service
                    const responseTasks = await axios.get(`http://localhost:8086/services/${selectedService.id}/tasks`);
                    setTasks(responseTasks.data);

                    // Fetch projects associated with these tasks
                    const projectPromises = responseTasks.data.map(task =>
                        axios.get(`http://localhost:8086/taches/${task.id}/projects`)
                    );
                    const projectResponses = await Promise.all(projectPromises);
                    const allProjects = projectResponses.flatMap(response => response.data);
                    setProjects(allProjects);
                } catch (error) {
                    console.error('Erreur lors de la récupération des tâches:', error);
                }
            };

            fetchTasksAndProjects();
        }
    }, [selectedService]);

    const handleUpdateService = () => {
        axios.put(`http://localhost:8086/services/${selectedService.id}`, serviceToUpdate)
            .then(() => {
                alert('Service mis à jour avec succès !');
                setSelectedService(prev => ({ ...prev, ...serviceToUpdate }));
                handleCloseUpdateDialog();
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour du service:', error);
                alert('Erreur lors de la mise à jour du service: ' + error.message);
            });
    };

    const handleDeleteService = () => {
        axios.delete(`http://localhost:8086/services/${selectedService.id}`)
            .then(() => {
                alert('Service supprimé avec succès !');
                setSelectedService(null); // Clear the selected service
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du service:', error);
                alert('Erreur lors de la suppression du service: ' + error.message);
            });
    };

    const handleOpenUpdateDialog = () => {
        setServiceToUpdate({ nom: selectedService.nom });
        setOpenUpdateDialog(true);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    return (
        <div>
            {selectedService && (
                <div>
                    <h2 className="titre">Détails du Service</h2>
                    <p><strong>Nom:</strong> {selectedService.nom}</p>



                    <h3>Tâches associées au service {selectedService.nom}</h3>
                    <ul>
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <li key={task.id}>
                                    {task.description}
                                </li>
                            ))
                        ) : (
                            <p>Aucune tâche trouvée pour ce service.</p>
                        )}
                    </ul>

                    <h3>Projets associés aux tâches</h3>
                    <ul>
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <li key={project.id}>
                                    {project.titre}
                                </li>
                            ))
                        ) : (
                            <p>Aucun projet associé aux tâches trouvées.</p>
                        )}
                    </ul>
                </div>
            )}
            {!selectedService && <p>Sélectionnez un service pour afficher les détails.</p>}

            <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
                <DialogTitle>Mettre à jour le Service</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nom"
                        value={serviceToUpdate.nom}
                        onChange={(e) => setServiceToUpdate({ ...serviceToUpdate, nom: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleCloseUpdateDialog} className="buttons-container">
                        Annuler
                    </button>
                    <button onClick={handleUpdateService} className="buttons-container">
                        Mettre à jour
                    </button>
                </DialogActions>
            </Dialog>
            <button className="buttons-container"onClick={handleOpenUpdateDialog} variant="contained" color="primary">
                                    Mettre à jour le Service
                                </button>
                                <button className="buttons-container" onClick={handleDeleteService} variant="contained" color="secondary">
                                    Supprimer le Service
                                </button>
        </div>
    );
};

export default DetailService;
