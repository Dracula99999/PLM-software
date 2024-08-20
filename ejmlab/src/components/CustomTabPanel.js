import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import './../styles/CustomTabPanel.css';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className={`custom-tab-panel ${value === index ? 'active' : ''}`}
        >
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default CustomTabPanel;