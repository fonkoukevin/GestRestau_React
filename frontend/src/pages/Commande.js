import React, { useState } from 'react';
import '../styles/Commande.css';


const CommandePage = () => {
  const [commandes, setCommandes] = useState([]);
  const [numero, setNumero] = useState('');
  const [plat, setPlat] = useState('');
  const [boisson, setBoisson] = useState('');
  const [tempsCuisson, setTempsCuisson] = useState('');
  const [prixPlat, setPrixPlat] = useState('');
  const [prixBoisson, setPrixBoisson] = useState('');

  const handleDelete = (commandeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      setCommandes((prevCommandes) =>
        prevCommandes.filter((commande) => commande.id !== commandeId)
      );
    }
  };

  const handleAdd = () => {
    const nouvelleCommande = {
      id: Math.random().toString(),
      numero,
      prix: calculatePrixTotal(),
      contenu: plat,
      boisson,
    };
    setCommandes((prevCommandes) => [...prevCommandes, nouvelleCommande]);
    setNumero('');
    setPlat('');
    setBoisson('');
    setTempsCuisson('');
    setPrixPlat('');
    setPrixBoisson('');
  };

  const getTempsCuisson = (nomPlat) => {
    // Logique pour récupérer le temps de cuisson en fonction du plat
    
    if (nomPlat === 'Pizza') {
      return '30 minutes';
    } else if (nomPlat === 'Burger') {
      return '20 minutes';
    } else if (nomPlat === 'Pâtes') {
      return '15 minutes';
    } else {
      return '';
    }
  };

  const handlePlatChange = (event) => {
    const selectedPlat = event.target.value;
    setPlat(selectedPlat);
    setTempsCuisson(getTempsCuisson(selectedPlat));
    setPrixPlat(calculatePrixPlat(selectedPlat));
  };

  const handleBoissonChange = (event) => {
    const selectedBoisson = event.target.value;
    setBoisson(selectedBoisson);
    setPrixBoisson(calculatePrixBoisson(selectedBoisson));
  };

  const calculatePrixPlat = (nomPlat) => {
    // Logique pour afficher le prix du plat en fonction du plat sélectionné
    
    if (nomPlat === 'Pizza') {
      return 1500;
    } else if (nomPlat === 'Burger') {
      return 1000;
    } else if (nomPlat === 'Pâtes') {
      return 800;
    } else {
      return 0;
    }
  };

  const calculatePrixBoisson = (nomBoisson) => {
    // Logique pour afficher le prix de la boisson en fonction de la boisson sélectionnée
    if (nomBoisson === 'Coca-Cola') {
      return 500;
    } else if (nomBoisson === 'Fanta') {
      return 400;
    } else if (nomBoisson === 'Sprite') {
      return 300;
    } else {
      return 0;
    }
  };

  const calculatePrixTotal = () => {
    return prixPlat + prixBoisson;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAdd();
  };

  return (
    <div>
      <h2>Liste des commandes</h2>
      {commandes.length > 0 ? (
        <div className="commande-container">
          {commandes.map((commande) => (
            <div className="commande-card" key={commande.id}>
              <button
                className="delete-button"
                onClick={() => handleDelete(commande.id)}
              >
                Supprimer
              </button>
              <h3>Numéro de commande : {commande.numero}</h3>
              <p>Prix : {commande.prix} FCFA</p>
              <p>Plat : {commande.contenu}</p>
              <p>Boisson : {commande.boisson}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='message'>Aucune commande trouvée.</p>
      )}

      <h2>Ajouter une nouvelle commande</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Numéro de commande:
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
        </label>
        <br />
        <label>
          Plat :
          <select value={plat} onChange={handlePlatChange}>
            <option value="">Sélectionner un plat</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="Pâtes">Pâtes</option>
          </select>
        </label>
        <br />
        <label>
          Temps de cuisson :
          <span className="temps-cuisson">{tempsCuisson}</span>
        </label>
        <br />
        <label>
          Boisson :
          <select value={boisson} onChange={handleBoissonChange}>
            <option value="">Sélectionner une boisson</option>
            <option value="Coca-Cola">Coca-Cola</option>
            <option value="Fanta">Fanta</option>
            <option value="Sprite">Sprite</option>
          </select>
        </label>
        <br />
        <label>
          Prix plat :
          <span className="prix-plat">{prixPlat} FCFA</span>
        </label>
        <br />
        <label>
          Prix boisson :
          <span className="prix-boisson">{prixBoisson} FCFA</span>
        </label>
        <br />
        <label>
          Prix total :
          <span className="prix-total">{calculatePrixTotal()} FCFA</span>
        </label>
        <br />
        <button type="submit">Ajouter</button>
      </form>

 
      
    </div>
  );
};

export default CommandePage;
