import React from 'react';
import '../styles/Dashboard.css';
import Comm from "./comm.jpg";
import Tmenu from './Tmenu.png';
import Table from './table.jpg';
import Emplo from './emplo.jpg';
import Argent from './argent.jpg';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-image">
        </div>
      </header>
      <div className="dashboard-widgets">

        <div className="widget">
         
          <div className="widget-content">
            <h2>Nombre total des commandes</h2>
            <p>0</p>
          </div>
          <div className="widget-image">
            <img className='im' src={Comm} alt="image" />
          </div>
        </div>

        <div className="widget">
          
          <div className="widget-content">
            <h2>Montant total des ventes</h2>
            <p>0</p>
          </div>
          <div className="widget-image">
            <img   className='image' src={Argent} alt="image" />
          </div>
        </div>

        <div className="widget">
          
          <div className="widget-content">
            <h2>Nombre total d'employés</h2>
            <p>0</p>
          </div>
          <div className="widget-image">
            <img  className='image' src={Emplo} alt="image" />
          </div>
        </div>

        <div className="widget">
          
          <div className="widget-content">
            <h2>Nombre total des menus</h2>
            <p>0</p>
          </div>
          <div className="widget-image">
            <img  className='image' src={Tmenu} alt="image" />
          </div>
        </div>

        <div className="widget">
          
          <div className="widget-content">
            <h2>Nombre total de places disponibles</h2>
            <p>0</p>
          </div>
          <div className="widget-image">
            <img  className='image' src={Table} alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
