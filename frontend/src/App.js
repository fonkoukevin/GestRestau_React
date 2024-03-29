import React from 'react'
import "./App.css";
import { BrowserRouter, Route ,Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar";
import Dashboard from './pages/Dashboard';
import  Menu from "./pages/Menu";
import Table from "./pages/Table";
import EmployePage from './pages/Employe';
import CommandePage from './pages/Commande';
import Notfound from './pages/Notfound';

const App = ()=>{
  return(
    <BrowserRouter>
      {/* qui facilite la gestion des routes  synchroniser l'URL de l'application avec les composants */}
    <Sidebar>
     <Routes>  //permet de definir les routes 
        <Route path="/"element={<Dashboard/>} />     /* composnant qui defini chaque route as un chemin */
        <Route path="/dashboard"element={<Dashboard/>} />
        <Route path="/commande"element={<CommandePage/>} />
        <Route path="/table"element={<Table/>} />
        <Route path="/menu"element={<Menu/>} />
        <Route path="/employe"element={<EmployePage/>} />
        <Route path="*"element={<Notfound/>} />

     </Routes>
     </Sidebar>
    </BrowserRouter>
  );
};

export default App;

