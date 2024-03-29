import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Menu.css';

function Menu() {
  const [menus, setMenus] = useState([]);
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [photo, setPhoto] = useState('');
  const [dure, setDure] = useState('');
  const [description, setDescription] = useState('');
  const [editMenuId, setEditMenuId] = useState('');

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/menus');
      setMenus(response.data);
    } catch (error) {
      console.log('Erreur lors de la récupération des menus:', error);
    }
  };

  const handleDelete = async (menuId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) {
      try {
        await axios.delete(`http://localhost:8080/api/menus/${menuId}`);
        setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuId));
      } catch (error) {
        console.log('http://localhost:8080/api/menus');
      }
    }
  };

  const handleEdit = (menuId) => {
    const menuToEdit = menus.find((menu) => menu.id === menuId);
    if (menuToEdit) {
      setNom(menuToEdit.name);
      setPrix(menuToEdit.price);
      setPhoto(menuToEdit.photo);
      setDure(menuToEdit.duration);
      setDescription(menuToEdit.description);
      setEditMenuId(menuId);
    }
  };

  const handleUpdate = async () => {
    const updatedMenu = {
      name: nom,
      price: prix,
      photo: photo,
      duration: dure,
      description: description,
    };
    try {
      await axios.put(`http://localhost:8080/api/menus/${editMenuId}`, updatedMenu);
      setMenus((prevMenus) =>
        prevMenus.map((menu) => (menu.id === editMenuId ? { ...menu, ...updatedMenu } : menu))
      );
      setNom('');
      setPrix('');
      setPhoto('');
      setDure('');
      setDescription('');
      setEditMenuId('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    const newMenu = {
      name: nom,
      price: prix,
      duration: dure,
      photo: photo,
      description: description,
    };
    try {
      const response = await axios.post('http://localhost:8080/api/menus', newMenu);
      setMenus((prevMenus) => [...prevMenus, response.data]);
      setNom('');
      setPrix('');
      setDure('');
      setPhoto('');
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editMenuId) {
      handleUpdate();
    } else {
      handleAdd();
    }
  };

  return (
    <div>
      <h2>Liste des menus</h2>
      {menus.length > 0 ? (
        <div className="card-container">
          {menus.map((menu) => (
            <div className="menu-card1" key={menu.id}>
              <div className="image-container img">
                <img src={menu.photo} alt={menu.name} />
              </div>
              <div className="menu-details">
                <h3 className="card-title">{menu.name}</h3>
                <p className="menu-prix">Prix : {menu.price} FCFA</p>
                <p className="menu-duree">Durée : {menu.duration} min</p>
                <p className="menu-description">{menu.description}</p>
              </div>
              <div className="menu-actions">
                <button className="edit-button" onClick={() => handleEdit(menu.id)}>
                  Éditer
                </button>
                <button className="delete-button" onClick={() => handleDelete(menu.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="message">Aucun menu trouvé.</p>
      )}

      <h2>{editMenuId ? 'Modifier le menu' : 'Ajouter un nouveau menu'}</h2>
      <form className="menu-form" onSubmit={handleSubmit}>
        <label>
          Nom du menu:
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </label>
        <label>
          Prix :
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            required
          />
        </label>
        <label>
          Photo :
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setPhoto(URL.createObjectURL(file));
            }}
            required
          />
        </label>
        <label>
          Durée:
          <input
            type="number"
            value={dure}
            onChange={(e) => setDure(e.target.value)}
            required
          />
        </label>
        <label>
          Description :
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">{editMenuId ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
}

export default Menu;