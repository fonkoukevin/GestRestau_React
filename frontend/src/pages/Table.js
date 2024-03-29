import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Table.css';

const TablePage = () => {
  const [tables, setTables] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTable, setEditedTable] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tables');
      setTables(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (tableId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette table ?')) {
      try {
        await axios.delete(`http://localhost:8080/api/tables/${tableId}`);
        setTables((prevTables) =>
          prevTables.filter((table) => table.id !== tableId)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (table) => {
    setEditedTable(table);
    setEditMode(true);
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    const updatedTable = {
      ...editedTable,
      numero: event.target.numero.value,
      nombrePlaces: event.target.nombrePlaces.value,
      forme: event.target.forme.value,
      position: event.target.position.value,
    };
    try {
      await axios.put(`http://localhost:8080/api/tables/${updatedTable.id}`, updatedTable);
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === updatedTable.id ? updatedTable : table
        )
      );
      setEditedTable(null);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditedTable(null);
    setEditMode(false);
  };

  const handleAdd = async (newTable) => {
    try {
      const response = await axios.post('http://localhost:8080/api/tables', newTable);
      setTables((prevTables) => [...prevTables, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <h2>Liste des tables</h2>
    {tables.length > 0 ? (
      <div className="table-container">
        {tables.map((table) => (
          <div key={table.id} className="table-card">
            <h3>Table {table.numero}</h3>
            <p>Nombre de places : {table.nombrePlaces}</p>
            <p>Forme : {table.forme}</p>
            <p>Position : {table.position}</p>
            {editMode && editedTable?.id === table.id ? (
              <form onSubmit={handleSaveEdit}>
                <div className="form-row">
                  <label>
                    Numéro :
                    <input
                      type="text"
                      name="numero"
                      defaultValue={editedTable.numero}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Nombre de places :
                    <input
                      type="number"
                      name="nombrePlaces"
                      defaultValue={editedTable.nombrePlaces}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Forme :
                    <select name="forme" defaultValue={editedTable.forme}>
                      <option value="cercle">Cercle</option>
                      <option value="demi-cercle">Demi-cercle</option>
                      <option value="carre">Carré</option>
                      <option value="rectangle">Rectangle</option>
                    </select>
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Position :
                    <select
                      name="position"
                      defaultValue={editedTable.position}
                    >
                      <option value="centre">Centre</option>
                      <option value="angle">Angle</option>
                      <option value="fenetre">Fenêtre</option>
                    </select>
                  </label>
                </div>
                <div className="button-container">
                  <button type="submit">Enregistrer</button>
                  <button type="button" onClick={handleCancelEdit}>
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="button-container">
                <button onClick={() => handleDelete(table.id)}>
                  Supprimer
                </button>
                <button onClick={() => handleEdit(table)}>Éditer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className='message'>Aucune table trouvée.</p>
    )}

    <h2>Ajouter une nouvelle table</h2>
    <form
      className="table-form"
      onSubmit={(e) => {
        e.preventDefault();
        const newTable = {
          id: Math.random().toString(),
          numero: e.target.numero.value,
          nombrePlaces: e.target.nombrePlaces.value,
          forme: e.target.forme.value,
          position: e.target.position.value,
        };
        handleAdd(newTable);
        e.target.reset();
      }}
    >
      <div className="form-row">
        <label>
          Numéro :
          <br/>
          <input type="text" name="numero" defaultValue={editedTable ? editedTable.numero : ''} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Nombre de places :
          <br/>
          <input type="number" name="nombrePlaces" defaultValue={editedTable ? editedTable.nombrePlaces : ''} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Forme :
          <br/>
          <select name="forme" defaultValue={editedTable ? editedTable.forme : 'cercle'}>
            <option value="cercle">Cercle</option>
            <option value="demi-cercle">Demi-cercle</option>
            <option value="carre">Carré</option>
            <option value="rectangle">Rectangle</option>
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          Position :
          <br/>
          <select name="position" defaultValue={editedTable ? editedTable.position : 'centre'}>
            <option value="centre">Centre</option>
            <option value="angle">Angle</option>
            <option value="fenetre">Fenêtre</option>
          </select>
        </label>
      </div>
      <button type="submit1">Ajouter</button>
    </form>
  </div>

  );
};

export default TablePage;