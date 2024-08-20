import React from 'react';
import BasicMenu from './BasicMenu';
import './../styles/Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <BasicMenu />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;