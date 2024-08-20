import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Layout from '../Layout';
import ListProject from './ListProject';
import DetailProject from './DetailProject';
import NewProjectForm from './NewProjectForm';
import CustomTabPanel from './../CustomTabPanel'; // Import CustomTabPanel
import './../../styles/ProjetDetails.css';

const Project = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedProjet, setSelectedProjet] = useState(null);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSelectProjet = (projet) => {
        setSelectedProjet(projet);
        setActiveTab(1); // Switch to the DetailProject tab
    };

    return (
        <Layout>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example"
                      sx={{
                          borderBottom: '1px solid #ccc',
                          '& .MuiTabs-indicator': {
                              backgroundColor: 'transparent',
                          },
                          '.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected ': {
                              color: '#dd191f',
                          },
                      }}>
                    <Tab label="Liste des projets" />
                    <Tab label="Détails du projet" />
                    <Tab label="Ajouter un nouveau projet" />
                </Tabs>
            </Box>
            <div className="projet-details-content">
                <CustomTabPanel value={activeTab} index={0}>
                    <ListProject onSelectProjet={handleSelectProjet} />
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={1}>
                    {selectedProjet ? <DetailProject selectedProjet={selectedProjet} setSelectedProjet={setSelectedProjet} /> : <p>Please select a project</p>}
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={2}>
                    <NewProjectForm />
                </CustomTabPanel>
            </div>
        </Layout>
    );
};

export default Project;
