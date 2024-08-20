import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MatierePremiereDetails from './components/MatierePremiereDetails';
import Librairie from "./components/Librairie";
import ProductDetails from "./components/ProductDetails";
import ControleQualite from "./components/ControleQualite";
import Service from "./components/Service/Service";
import Project from "./components/Project/Project";
import Users from "./components/User/Users";
import Stock from "./components/User/Stock";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import Profile from "./components/User/Profile";
import Log from "./components/User/Log";
import Formulation from "./components/Formulation/formulation";
import ControleQualiteMP from "./components/ControlleQualiteMP/ControleQualiteMp";
import ControleQualiteEnCoursDeMelangeForm from "./components/ControlleQualiteMP/ControleQualiteEnCoursDeMelangeForm";

const App = () => {
  return (
      <Router>
        <div className="App">
          <Routes>

              <Route path="/" element={<Log />} />
            <Route path="/matiere-premiere" element={<MatierePremiereDetails />} />
            <Route path="/librairie" element={<Librairie />} />

            <Route path="/produitfini" element={<ProductDetails />} />
              <Route path={"/qualite"} element={<ControleQualite />} />
              <Route path={"/controlequalitemp"} element={<ControleQualiteMP />} />
              <Route path={"/controlequalitempencoursmelange"} element={<ControleQualiteEnCoursDeMelangeForm />} />
              <Route path={"/service"} element={<Service />} />
              <Route path={"/projet"} element={<Project />} />
              <Route path="/User" element={<Users />} />
              <Route path="/Stock" element={<Stock />} />
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="/EditUser/:id" element={<EditUser />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/formulation" element={<Formulation />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
