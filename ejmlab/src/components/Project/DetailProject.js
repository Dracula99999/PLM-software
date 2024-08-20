import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './../../styles/ProjetDetails.css';

const predefinedTasks = [
    "Fiche de déclanchement du nouveau produit",
    "Planification du projet du nouveau produit",
    "Elaboration de la fiche des exigences spécifiques des nouveaux produits",
    "Echantillons de l’emballage plastique",
    "Choix de l’emballage plastique"
];


const DetailProject = ({ selectedProjet, setSelectedProjet }) => {
    const [newTask, setNewTask] = useState({
        description: '',
        categorie: '',
        applicable: true,
        nonapplicable: false,
        attribue: '',
        progression: '',
        jour: '',
        debut: '',
        service: ''
    });

    const [services, setServices] = useState([]);
    const [taskDescriptions, setTaskDescriptions] = useState(predefinedTasks);

    const [filterApplicable, setFilterApplicable] = useState(false); // État pour gérer le filtre

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8090/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error loading services:', error);
            }
        };

        if (selectedProjet) {
            fetchServices();
        }
    }, [selectedProjet]);

    const handleAddTask = async (e) => {
        e.preventDefault();

        if (!newTask.service) {
            alert('Veuillez sélectionner un service.');
            return;
        }

        const serviceExists = services.find(service => service.nom === newTask.service.nom);
        const serviceToUse = serviceExists || (await axios.post('http://localhost:8090/CreateServices', { nom: newTask.service.nom })).data;

        try {
            const taskResponse = await axios.post('http://localhost:8090/CreateTaches', {
                description: newTask.description,
                service: serviceToUse
            });

            const createdTask = taskResponse.data;

            await axios.post('http://localhost:8090/CreateTachesProject', {
                categorie: newTask.categorie,
                applicable: newTask.applicable,
                nonapplicable: newTask.nonapplicable,
                attribue: newTask.attribue,
                progression: newTask.progression,
                jour: newTask.jour,
                debut: newTask.debut,
                tache: createdTask,
                projet: selectedProjet
            });

            setSelectedProjet(prevProjet => ({
                ...prevProjet,
                tachesProject: [...prevProjet.tachesProject, {
                    ...newTask,
                    tache: createdTask,
                    service: serviceToUse
                }]
            }));

            alert('Tâche ajoutée avec succès !');
            setNewTask({
                description: '',
                categorie: '',
                applicable: true,
                nonapplicable: false,
                attribue: '',
                progression: '',
                jour: '',
                debut: '',
                service: ''
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
            alert('Erreur lors de l\'ajout de la tâche: ' + error.message);
        }
    };


    const handleUpdateTask = async (taskProjectId, updatedData) => {
        try {
            console.log('Updated Data:', updatedData); // Log the data being sent
            console.log('Task Project ID:', taskProjectId); // Log the taskProjectId being sent

            // Envoyer uniquement les données modifiées
            const response = await axios.put(`http://localhost:8090/UpdateTachesProject/${taskProjectId}`, updatedData);
            console.log('Réponse du serveur:', response.data); // Afficher la réponse du serveur

            setSelectedProjet(prevProjet => ({
                ...prevProjet,
                tachesProject: prevProjet.tachesProject.map(task =>
                    task.id === taskProjectId ? { ...task, ...updatedData } : task
                )
            }));

        } catch (error) {
            //console.error('Erreur lors de la mise à jour de la tâche:', error.response ? error.response.data : error.message);
            //alert('Erreur lors de la mise à jour de la tâche: ' + (error.response ? error.response.data.message : error.message));
        }
    };



    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8090/DeleteTachesProject/${taskId}`);

            setSelectedProjet(prevProjet => ({
                ...prevProjet,
                tachesProject: prevProjet.tachesProject.filter(task => task.id !== taskId)
            }));

            alert('Tâche supprimée avec succès !');
        } catch (error) {
            console.error('Erreur lors de la suppression de la tâche:', error);
            alert('Erreur lors de la suppression de la tâche: ' + error.message);
        }
    };
    const filteredTasks = filterApplicable
        ? selectedProjet.tachesProject.filter(tache => tache.applicable)
        : selectedProjet.tachesProject;

    const handleAddTaskBetween = async (tacheProjetId) => {
        const newTask = {
            description: '',
            categorie: '',
            applicable: true,
            nonapplicable: false,
            attribue: '',
            progression: '',
            jour: '',
            debut: '',
            service: '',
            tacheProjetId: tacheProjetId,
        };

        try {
            // Créer la nouvelle tâche dans la base de données
            const responseCreateTask = await axios.post('http://localhost:8090/CreateTachesProject', newTask);
            const createdTask = responseCreateTask.data;

            // Mettre à jour le projet avec la nouvelle tâche
            setSelectedProjet(prevProjet => {
                // Trouver l'index de la tâche projet concernée
                const index = prevProjet.tachesProject.findIndex(tache => tache.id === tacheProjetId);

                if (index === -1) {
                    // Tâche projet non trouvée
                    console.error('Tâche projet non trouvée');
                    alert('Tâche projet non trouvée');
                    return prevProjet;
                }

                // Insérer la nouvelle tâche à l'index + 1
                const newTachesProject = [
                    ...prevProjet.tachesProject.slice(0, index + 1),
                    createdTask,
                    ...prevProjet.tachesProject.slice(index + 1)
                ];

                // Retourner le projet mis à jour
                return {
                    ...prevProjet,
                    tachesProject: newTachesProject
                };
            });

            // Mettre à jour le projet dans la base de données
            const updatedProjet = {
                ...selectedProjet,
                tachesProject: [...selectedProjet.tachesProject, createdTask] // Inclure la nouvelle tâche dans l'objet projet mis à jour
            };

            await axios.put(`http://localhost:8090/UpdateProjets/${selectedProjet.id}`, updatedProjet);

            alert('Tâche ajoutée et projet mis à jour avec succès !');
        } catch (error) {

        }
    };





    return (
        <div className="projet-list-section">
            {selectedProjet && (
                <div className="projet-details-section">
                    <h2 className="titre">Détails du projet</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="label">Numéro:</span> {selectedProjet.numero}
                        </div>
                        <div className="detail-item">
                            <span className="label">Titre:</span> {selectedProjet.titre}
                        </div>
                        <div className="detail-item">
                            <span className="label">Catégorie:</span> {selectedProjet.categorie}
                        </div>
                        <div className="detail-item">
                            <span className="label">Avancement:</span> {selectedProjet.avancement}
                        </div>
                        <div className="detail-item">
                            <span className="label">Date de début:</span> {selectedProjet.dateDebut}
                        </div>
                        <div className="detail-item">
                            <span className="label">Durée du projet:</span> {selectedProjet.dureeDuProjet}
                        </div>
                        <div className="detail-item">
                            <span className="label">Début réel:</span> {selectedProjet.debutReel}
                        </div>
                        <div className="detail-item">
                            <span className="label">Durée réelle:</span> {selectedProjet.dureeReel}
                        </div>
                    </div>

                    {selectedProjet.tachesProject && (
                        <div className="tasks-section">
                            <h3>Tâches</h3>
                            <button className="buttonss"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setFilterApplicable(!filterApplicable)}
                            >
                                {filterApplicable ? "Afficher toutes les tâches" : "Filtrer les applicables"}
                            </button>
                            <table className="tasks-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Catégorie</th>
                                    <th>Applicable</th>
                                    <th>Non Applicable</th>
                                    <th>Attribué</th>
                                    <th>Progression</th>
                                    <th>Jour</th>
                                    <th>Début</th>
                                    <th>Service</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredTasks.map((tache, index) => (
                                    <tr key={tache.id}>
                                        <td>{index + 1}</td> {/* Display the ordered ID here */}
                                        <td>
                                            <TextField
                                                value={tache.tache ? tache.tache.description : ''}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, tache: { ...tache.tache, description: e.target.value } })}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                value={tache.categorie}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, categorie: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={tache.applicable}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, applicable: e.target.checked })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={tache.nonapplicable}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, nonapplicable: e.target.checked })}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                value={tache.attribue}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, attribue: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                value={tache.progression}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, progression: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="Date"
                                                value={tache.jour}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, jour: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="time"
                                                value={tache.debut}
                                                onChange={(e) => handleUpdateTask(tache.id, { ...tache, debut: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <TextField
                                                value={tache.tache && tache.tache.service ? tache.tache.service.nom : ''}
                                                onChange={(e) => handleUpdateTask(tache.id, {
                                                    ...tache,
                                                    tache: {
                                                        ...tache.tache,
                                                        service: {
                                                            ...tache.tache.service,
                                                            nom: e.target.value
                                                        }
                                                    }
                                                })}
                                            />

                                        </td>
                                        <td>
                                            <button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleUpdateTask(tache.id, tache)}
                                            >
                                                Mettre à jour
                                            </button>
                                            <button variant="contained" color="primary" onClick={() => handleAddTaskBetween(tache.id)} >
                                                +
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td>
                                        <TextField placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                                    </td>
                                    <td>
                                        <TextField placeholder="Catégorie" value={newTask.categorie} onChange={e => setNewTask({ ...newTask, categorie: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={newTask.applicable} onChange={e => setNewTask({ ...newTask, applicable: e.target.checked })} />
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={newTask.nonapplicable} onChange={e => setNewTask({ ...newTask, nonapplicable: e.target.checked })} />
                                    </td>
                                    <td>
                                        <TextField placeholder="Attribué" value={newTask.attribue} onChange={e => setNewTask({ ...newTask, attribue: e.target.value })} />
                                    </td>
                                    <td>
                                        <TextField placeholder="Progression" value={newTask.progression} onChange={e => setNewTask({ ...newTask, progression: e.target.value })} />
                                    </td>
                                    <td>
                                        <input
                                            type="date" placeholder="Jour" value={newTask.jour} onChange={e => setNewTask({ ...newTask, jour: e.target.value })} />
                                    </td>
                                    <td>
                                        <input
                                            type="time" placeholder="Début" value={newTask.debut} onChange={e => setNewTask({ ...newTask, debut: e.target.value })} />
                                    </td>
                                    <td>
                                        <Autocomplete
                                            options={services.map(service => service.nom)}
                                            getOptionLabel={(option) => option}
                                            value={newTask.service ? newTask.service.nom : ''}
                                            onChange={(event, newValue) => {
                                                const selectedService = services.find(service => service.nom === newValue);
                                                setNewTask({ ...newTask, service: selectedService });
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} placeholder="Service" required />
                                            )}
                                        />

                                    </td>
                                    <td>
                                        <button variant="contained" color="primary" onClick={handleAddTask}>Ajouter</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DetailProject;

