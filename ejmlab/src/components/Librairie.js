import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import Layout from './Layout';
import './../styles/Librairie.css';

const Librairie = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [matiereList, setMatiereList] = useState([]);
    const [selectedMatiere, setSelectedMatiere] = useState('');
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
    const [langue, setLangue] = useState('');
    const [dateDuDocument, setDateDuDocument] = useState('');
    const [dateExpiration, setDateExpiration] = useState('');
    const [demandeLe, setDemandeLe] = useState('');
    const [modifiePar, setModifiePar] = useState('');
    const [misAJourLe, setMisAJourLe] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);


    const resetForm = () => {
        setType('');
        setLangue('');
        if (!selectedItemId) {
            setFile(null);
        }
        setDateDuDocument('');
        setDateExpiration('');
        setDemandeLe('');
        setModifiePar('');
        setMisAJourLe('');
    };

    const fetchData = async () => {
        try {
            if (selectedMatiere) {
                const response = await axios.get(`http://localhost:8084/api/librairie/matiere/${selectedMatiere}`);
                setData(response.data);
            } else {
                setData([]);
            }
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedMatiere]);

    useEffect(() => {
        axios.get('http://localhost:8084/matierePremieres')
            .then(response => {
                setMatiereList(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Erreur lors de la récupération de la liste des matières premières.");
                setLoading(false);
            });
    }, []);

    const handleMatiereSelect = (e) => {
        setSelectedMatiere(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setFile(event.target.result.split(',')[1]);
        };
        reader.readAsDataURL(file);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleLangueChange = (e) => {
        setLangue(e.target.value);
    };

    const handleDateDuDocumentChange = (e) => {
        setDateDuDocument(e.target.value);
    };

    const handleDateExpirationChange = (e) => {
        setDateExpiration(e.target.value);
    };

    const handleDemandeLeChange = (e) => {
        setDemandeLe(e.target.value);
    };

    const handleModifieParChange = (e) => {
        setModifiePar(e.target.value);
    };

    const handleMisAJourLeChange = (e) => {
        setMisAJourLe(e.target.value);
    };

    const handleUpload = async () => {
        const librairie = {
            type,
            langue,
            dateDuDocument,
            dateExpiration,
            demandeLe,
            modifiePar,
            misAJourLe,
            matierePremiere: {
                id: selectedMatiere
            }
        };
        if (file) {
            librairie.fichier = file;
        }

        try {
            let response;
            if (selectedItemId) {
                if (!file) {
                    const existingItem = data.find(item => item.id === selectedItemId);
                    if (existingItem && existingItem.fichier) {
                        librairie.fichier = existingItem.fichier;
                    }
                }
                response = await axios.put(`http://localhost:8084/api/librairie/${selectedItemId}`, librairie, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await axios.post('http://localhost:8084/api/librairie/upload', librairie, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            console.log(response.data);
            alert(selectedItemId ? 'Fichier mis à jour avec succès' : 'Fichier uploadé avec succès');
            fetchData();
            setSelectedItemId(null);
            resetForm();
        } catch (error) {
            console.error(selectedItemId ? 'Erreur lors de la mise à jour du fichier' : 'Erreur lors de l\'upload du fichier', error);
            alert(selectedItemId ? 'Erreur lors de la mise à jour du fichier' : 'Erreur lors de l\'upload du fichier');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8084/api/librairie/${id}`);
            alert('Librairie supprimée avec succès');
            setData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la librairie', error);
            alert('Erreur lors de la suppression de la librairie');
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Type', accessor: 'type' },
            { Header: 'Langue', accessor: 'langue' },
            { Header: 'Fichier', accessor: 'fichier', Cell: ({ row }) => (
                    <div>
                        {row.original.fichier && (
                            <a href={`http://localhost:8084/api/librairie/download/${row.original.id}`} target="_blank" rel="noopener noreferrer">Voir le fichier</a>
                        )}
                    </div>
                ) },
            { Header: 'Date du document', accessor: 'dateDuDocument' },
            { Header: 'Date d\'expiration', accessor: 'dateExpiration' },
            { Header: 'Demandé le', accessor: 'demandeLe' },
            { Header: 'Modifié par', accessor: 'modifiePar' },
            { Header: 'Mis à jour le', accessor: 'misAJourLe' },
            { Header: 'Actions', accessor: 'id', Cell: ({ value }) => (
                    <div className="button-container">
                        <button onClick={() => {
                            setSelectedItemId(value);
                            const selectedRow = data.find(item => item.id === value);
                            setType(selectedRow.type);
                            setLangue(selectedRow.langue);
                            setDateDuDocument(selectedRow.dateDuDocument);
                            setDateExpiration(selectedRow.dateExpiration);
                            setDemandeLe(selectedRow.demandeLe);
                            setModifiePar(selectedRow.modifiePar);
                            setMisAJourLe(selectedRow.misAJourLe);
                        }}>Modifier</button>
                        <button onClick={() => handleDelete(value)}>Supprimer</button>
                    </div>
                ) },
        ],
        [data]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <Layout>
            <div className="librairie">
                <h2 className="titre">Librairie</h2>
                <div className="matiere-select">
                    <label>Sélectionner une matière première :</label>
                    <select value={selectedMatiere} onChange={handleMatiereSelect}>
                        <option value="">Sélectionnez une matière première</option>
                        {matiereList.map(matiere => (
                            <option key={matiere.id} value={matiere.id}>
                                {matiere.code} - {matiere.article}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedMatiere && (
                    <div className="document-table">
                        <table {...getTableProps()} className="table">
                            <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                            <tr>
                                <th>
                                    <input type="text" placeholder="Type" value={type} onChange={handleTypeChange}/>
                                </th>
                                <th>
                                    <input type="text" placeholder="Langue" value={langue} onChange={handleLangueChange}/>
                                </th>
                                <th>
                                    <input type="file" onChange={handleFileChange}/>
                                </th>
                                <th>
                                    <input type="date" value={dateDuDocument} onChange={handleDateDuDocumentChange}/>
                                </th>
                                <th>
                                    <input type="date" value={dateExpiration} onChange={handleDateExpirationChange}/>
                                </th>
                                <th>
                                    <input type="date" value={demandeLe} onChange={handleDemandeLeChange} />
                                </th>
                                <th>
                                    <input type="text" placeholder="Modifié par" value={modifiePar} onChange={handleModifieParChange} />
                                </th>
                                <th>
                                    <input type="date" value={misAJourLe} onChange={handleMisAJourLeChange} />
                                </th>
                                <th>
                                    <div className="button-container">
                                        <button onClick={handleUpload}>{selectedItemId ? 'Mettre à jour' : 'Ajouter'}</button>
                                        {selectedItemId && (
                                            <button onClick={() => setSelectedItemId(null)}>Annuler</button>
                                        )}
                                    </div>
                                </th>
                            </tr>
                            </thead>
                            <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Librairie;
