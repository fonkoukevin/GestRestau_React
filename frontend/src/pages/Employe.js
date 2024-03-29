import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Employe.css';

function Employe() {
  const [employes, setEmployes] = useState([]);
  const [nom, setNom] = useState('');
  const [surnom, setSurnom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [poste, setPoste] = useState('');
  const [editEmployeId, setEditEmployeId] = useState('');



  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employes');
      setEmployes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (employeId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      try {
        await axios.delete(`http://localhost:8080/api/employes/${employeId}`);
        setEmployes((prevEmployes) =>
          prevEmployes.filter((employe) => employe.id !== employeId)
        );
        if (editEmployeId === employeId) {
          setEditEmployeId('');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (employeId) => {
    const employeToEdit = employes.find((employe) => employe.id === employeId);
    if (employeToEdit) {
      setNom(employeToEdit.nom);
      setSurnom(employeToEdit.surnom);
      setTelephone(employeToEdit.telephone);
      setPoste(employeToEdit.poste);
      setEditEmployeId(employeId);
    }
  };




  const handleUpdate = async () => {
    const updatedEmploye = {
      id: editEmployeId,
      nom,
      surnom,
      telephone,
      poste,
    };
    try {
      await axios.put(`http://localhost:8080/api/employes/${editEmployeId}`, updatedEmploye);
      setEmployes((prevEmployes) =>
      prevEmployes.map((employe) => (employe.id === editEmployeId ? { ...employe, ...updatedEmploye } : employe))
      );
      setNom('');
      setSurnom('');
      setTelephone('');
      setPoste('');
      setEditEmployeId('');
    } catch (error) {
      console.log(error);
    }
  };

 

  const handleAdd = async () => {
    const nouvelEmploye = {
      nom,
      surnom,
      telephone,
      poste,
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/employes', nouvelEmploye);
      const employeEnregistre = response.data;
      setEmployes((prevEmployes) => [...prevEmployes, employeEnregistre]);
      setNom('');
      setSurnom('');
      setTelephone('');
      setPoste('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Liste des employés</h2>
      {employes.length > 0 ? (
        <div>
          {employes.map((employe) => (
            <div key={employe.id} className="card-container2">
              <div className="card-content">
                <div className="card-title">{employe.nom}</div>
                <div className="card-description">
                  <p>Surnom: {employe.surnom}</p>
                </div>
                <div className="card-description">
                  <p>Téléphone: {employe.telephone}</p>
                </div>
                <div className="card-description">
                  <p>Poste: {employe.poste}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(employe.id)}
                  >
                    Éditer
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(employe.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='message'>Aucun employé</p>
      )}


      {/* <h2>Ajouter/Modifier un employé</h2> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (editEmployeId) {
            handleUpdate();
          } else {
            handleAdd();
          }
          e.target.reset();
        }}
      >
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <label htmlFor="surnom">Surnom :</label>
        <input
          type="text"
          id="surnom"
          value={surnom}
          onChange={(e) => setSurnom(e.target.value)}
        />

        <label htmlFor="telephone">Téléphone :</label>
        <input
          type="text"
          id="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />

        <label htmlFor="poste">Poste :</label>
        <input
          type="text"
          id="poste"
          value={poste}
          onChange={(e) => setPoste(e.target.value)}
        />

        <button type="submit">{editEmployeId ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
}

export default Employe;
