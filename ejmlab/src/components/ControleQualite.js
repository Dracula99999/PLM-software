import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    Box,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material';
import Layout from './Layout';

const ControleQualite = () => {
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
    const [rawMaterials, setRawMaterials] = useState([]);
    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const [modeOperatoire, setModeOperatoire] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [controleQualites, setControleQualites] = useState([]);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [selectedControle, setSelectedControle] = useState(null);

    useEffect(() => {
        // Fetch raw materials
        axios.get('http://localhost:8084/matierePremieres')
            .then(response => {
                setRawMaterials(response.data);
            })
            .catch(error => setError("Erreur lors de la récupération des matières premières."));

        // Fetch quality controls
        axios.get('http://localhost:8087/api/controleQualites')
            .then(response => setControleQualites(response.data))
            .catch(error => setError("Erreur lors de la récupération des contrôles qualité."));
    }, []);

    useEffect(() => {
        if (data.matierePremiereId) {
            const selected = rawMaterials.find(matiere => matiere.id === data.matierePremiereId);
            setSelectedMatiere(selected);

            // Fetch mode operatoire
            if (selected) {
                axios.get(`http://localhost:8087/api/modeOperatoires/${selected.id}`)
                    .then(response => setModeOperatoire(response.data.description || ''))
                    .catch(error => setError("Erreur lors de la récupération du mode opératoire."));
            }
        } else {
            setSelectedMatiere(null);
            setModeOperatoire('');
        }
    }, [data.matierePremiereId, rawMaterials]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:8087/api/controleQualites/create', data)
            .then(response => {
                setLoading(false);
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
            })
            .catch(error => {
                setLoading(false);
                setError("Erreur lors de l'enregistrement du contrôle qualité.");
            });
    };

    const handleSelectControle = (id) => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost:8087/api/controleQualites/${id}`)
            .then(response => {
                setSelectedControle(response.data);
                setLoading(false);
                setOpenUpdateDialog(true);
            })
            .catch(error => {
                setLoading(false);
                setError("Erreur lors de la récupération des détails.");
            });
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.put(`http://localhost:8087/api/controleQualites/${selectedControle.id}`, selectedControle)
            .then(response => {
                setLoading(false);
                setOpenUpdateDialog(false);

                setControleQualites(prevList => prevList.map(ctrl => (ctrl.id === response.data.id ? response.data : ctrl)));
            })
            .catch(error => {
                setLoading(false);
                setError("Erreur lors de la mise à jour du contrôle qualité.");
            });
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setSelectedControle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    return (
        <Layout>
            <div className="controle-qualite-form-container">
                <Box p={3}>
                    <Typography variant="h6">Formulaire de Contrôle Qualité</Typography>
                    <Box mt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Select
                                    label="Matière Première"
                                    name="matierePremiereId"
                                    value={data.matierePremiereId}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {rawMaterials.map(matiere => (
                                        <MenuItem key={matiere.id} value={matiere.id}>
                                            {matiere.code} - {matiere.article}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            {selectedMatiere && (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Code"
                                            value={selectedMatiere.code}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Article"
                                            value={selectedMatiere.article}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Fabricant"
                                            value={selectedMatiere.fabricant}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Fournisseur"
                                            value={selectedMatiere.fournisseur}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">Mode Opératoire</Typography>
                                        <TextField
                                            label="Description du Mode Opératoire"
                                            value={modeOperatoire}
                                            InputProps={{ readOnly: true }}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12}>
                                <Typography variant="h6">Controlle Qualité</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Désignation"
                                    name="designation"
                                    value={data.designation}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Date de Réception"
                                    name="dateReception"
                                    type="date"
                                    value={data.dateReception}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Taille Lot"
                                    name="tailleLot"
                                    value={data.tailleLot}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Unité"
                                    name="unite"
                                    value={data.unite}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Date de Prélèvement"
                                    name="datePrelevement"
                                    type="date"
                                    value={data.datePrelevement}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Date d'Analyse"
                                    name="dateAnalyse"
                                    type="date"
                                    value={data.dateAnalyse}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Opérateur"
                                    name="operateur"
                                    value={data.operateur}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Acceptation"
                                    name="acceptance"
                                    value={data.acceptance}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Date d'Acceptation"
                                    name="dateAcceptance"
                                    type="date"
                                    value={data.dateAcceptance}
                                    onChange={handleChange}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Validé Par"
                                    name="validatedBy"
                                    value={data.validatedBy}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Enregistrer'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {controleQualites.length > 0 && (
                    <Box p={3}>
                        <Typography variant="h6">Liste des Contrôles Qualité</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Désignation</TableCell>
                                    <TableCell>Date Réception</TableCell>
                                    <TableCell>Taille Lot</TableCell>
                                    <TableCell>Unité</TableCell>
                                    <TableCell>Date Prélèvement</TableCell>
                                    <TableCell>Date Analyse</TableCell>
                                    <TableCell>Opérateur</TableCell>
                                    <TableCell>Acceptation</TableCell>
                                    <TableCell>Date Acceptation</TableCell>
                                    <TableCell>Validé Par</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {controleQualites.map(ctrl => (
                                    <TableRow key={ctrl.id}>
                                        <TableCell>{ctrl.id}</TableCell>
                                        <TableCell>{ctrl.designation}</TableCell>
                                        <TableCell>{ctrl.dateReception}</TableCell>
                                        <TableCell>{ctrl.tailleLot}</TableCell>
                                        <TableCell>{ctrl.unite}</TableCell>
                                        <TableCell>{ctrl.datePrelevement}</TableCell>
                                        <TableCell>{ctrl.dateAnalyse}</TableCell>
                                        <TableCell>{ctrl.operateur}</TableCell>
                                        <TableCell>{ctrl.acceptance}</TableCell>
                                        <TableCell>{ctrl.dateAcceptance}</TableCell>
                                        <TableCell>{ctrl.validatedBy}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSelectControle(ctrl.id)}
                                            >
                                                Modifier
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                )}
                {selectedControle && (
                    <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
                        <DialogTitle>Modifier Contrôle Qualité</DialogTitle>
                        <DialogContent>
                            <Box p={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Désignation"
                                            name="designation"
                                            value={selectedControle.designation}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Date de Réception"
                                            name="dateReception"
                                            type="date"
                                            value={selectedControle.dateReception}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Taille Lot"
                                            name="tailleLot"
                                            value={selectedControle.tailleLot}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Unité"
                                            name="unite"
                                            value={selectedControle.unite}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Date de Prélèvement"
                                            name="datePrelevement"
                                            type="date"
                                            value={selectedControle.datePrelevement}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Date d'Analyse"
                                            name="dateAnalyse"
                                            type="date"
                                            value={selectedControle.dateAnalyse}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Opérateur"
                                            name="operateur"
                                            value={selectedControle.operateur}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Acceptation"
                                            name="acceptance"
                                            value={selectedControle.acceptance}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Date d'Acceptation"
                                            name="dateAcceptance"
                                            type="date"
                                            value={selectedControle.dateAcceptance}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Validé Par"
                                            name="validatedBy"
                                            value={selectedControle.validatedBy}
                                            onChange={handleUpdateChange}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseUpdateDialog} color="primary">
                                Annuler
                            </Button>
                            <Button onClick={handleUpdateSubmit} color="primary">
                                {loading ? <CircularProgress size={24} /> : 'Enregistrer'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </Layout>
    );
};

export default ControleQualite;
