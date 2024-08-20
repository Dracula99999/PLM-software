// src/components/Service.js
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Layout from '../Layout';
import ListService from './ListService';
import DetailService from './DetailService';
import NewServiceForm from './NewServiceForm';
import CustomTabPanel from './../CustomTabPanel'; // Assurez-vous que ce chemin est correct
import './../../styles/ServiceDetails.css'; // Assurez-vous que ce chemin est correct

const Service = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedService, setSelectedService] = useState(null);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSelectService = (service) => {
        setSelectedService(service);
        setActiveTab(1); // Switch to the DetailService tab
    };

    return (
        <Layout>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                    sx={{
                        borderBottom: '1px solid #ccc',
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'transparent',
                        },
                        '.Mui-selected': {
                            color: '#dd191f',
                        },
                    }}
                >
                    <Tab label="Liste des Services" />
                    <Tab label="Détails du Service" />
                    <Tab label="Créer un Service" />
                </Tabs>
            </Box>
            <div className="service-details-content">
                <CustomTabPanel value={activeTab} index={0}>
                    <ListService onSelectService={handleSelectService} />
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={1}>
                    {selectedService ? <DetailService selectedService={selectedService} setSelectedService={setSelectedService} /> : <p>Please select a service</p>}
                </CustomTabPanel>
                <CustomTabPanel value={activeTab} index={2}>
                    <NewServiceForm />
                </CustomTabPanel>
            </div>
        </Layout>
    );
};

export default Service;
