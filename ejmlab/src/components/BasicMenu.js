import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/menu.css';
import logoImage from './../asset/img/logo.png';
const menuData = [
    { label: "Accueil", path: "/" },
    { label: "Matière Première",
        subItems: [
            { label: "Présentation", path: "/matiere-premiere" },
            { label: "Librairie", path: "/librairie" },
            { label: "Controle qualité", path: "/qualite" },
            { label: "Stock", path: "/stock" },
        ],
    },
    { label: "Produit fini", path: "/produitfini" },
    { label: "Projet", path: "/projet" },
    //{ label: "Services", path: "/service" },
    { label: "Formulation", path: "/formulation" },
    { label: "Utilisateurs", path: "/User" },
    { label: "Profile", path: "/profile" },
    { label: "Deconnexion", path: "/" },
];

const MenuItem = ({ label, subItems, path }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="menu-item" onClick={() => setIsOpen(!isOpen)}>
                {path ? <Link to={path}>{label}</Link> : label}
                {subItems && <span>{isOpen ? '▼' : '▶'}</span>}
            </div>
            {isOpen && subItems && (
                <div className="submenu">
                    {subItems.map((subItem, index) => (
                        <MenuItem key={index} {...subItem} />
                    ))}
                </div>
            )}
        </div>
    );
};

const BasicMenu = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logoImage} alt="Logo EJM"/>
                <h1>EJM </h1>
            </div>
            <div>
                {menuData.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
            <div className="footer">
                <p>Retour</p>
                <p>Quitter</p>
            </div>
        </div>
    );
};

export default BasicMenu;
