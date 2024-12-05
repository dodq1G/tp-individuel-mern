import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [ads, setAds] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingAd, setEditingAd] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adsRes = await axios.get('http://localhost:5000/api/ads', {
          headers: { Authorization: token },
        });
        const usersRes = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: token },
        });
        setAds(adsRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token]);

  const deleteAd = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/ads/${id}`, {
        headers: { Authorization: token },
      });
      setAds(ads.filter((ad) => ad._id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: token },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateAd = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/ads/${editingAd._id}`,
        editingAd,
        { headers: { Authorization: token } }
      );
      setAds(ads.map((ad) => (ad._id === res.data._id ? res.data : ad)));
      setEditingAd(null);
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  // Modifier un utilisateur
  const updateUser = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${editingUser._id}`,
        editingUser,
        { headers: { Authorization: token } }
      );
      setUsers(users.map((user) => (user._id === res.data._id ? res.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Administration</h1>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Ads</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Categorie</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.title}</td>
                <td>{ad.category}</td>
                <td>{ad.price} €</td>
                <td>
                  <button style={styles.editButton} onClick={() => setEditingAd(ad)}>
                    Modifier
                  </button>
                  <button style={styles.deleteButton} onClick={() => deleteAd(ad._id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Utilisateurs</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button style={styles.editButton} onClick={() => setEditingUser(user)}>
                    Modifier
                  </button>
                  <button style={styles.deleteButton} onClick={() => deleteUser(user._id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingAd && (
        <div style={styles.modal}>
          <h2>Modifier l'annonce</h2>
          <input
            type="text"
            value={editingAd.title}
            onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            value={editingAd.category}
            onChange={(e) => setEditingAd({ ...editingAd, category: e.target.value })}
            style={styles.input}
          />
          <input
            type="number"
            value={editingAd.price}
            onChange={(e) => setEditingAd({ ...editingAd, price: e.target.value })}
            style={styles.input}
          />
          <button style={styles.saveButton} onClick={updateAd}>
            Sauvegarder
          </button>
          <button style={styles.cancelButton} onClick={() => setEditingAd(null)}>
            Annuler
          </button>
        </div>
      )}

      {editingUser && (
        <div style={styles.modal}>
          <h2>Modifier l'utilisateur</h2>
          <input
            type="text"
            value={editingUser.username}
            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
            style={styles.input}
          />
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            style={styles.input}
          />
          <button style={styles.saveButton} onClick={updateUser}>
            Sauvegarder
          </button>
          <button style={styles.cancelButton} onClick={() => setEditingUser(null)}>
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    minWidth: '800px',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  section: {
    marginBottom: '3rem',
  },
  subtitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#555',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.8rem',
    marginBottom: '1rem',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  editButton: {
    marginRight: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '400px',
  },
  saveButton: {
    marginRight: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AdminPage;
