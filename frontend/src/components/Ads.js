import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({ title: '', description: '', price: '', category: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ads');
        setAds(res.data);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/ads',
        { ...newAd },
        { headers: { Authorization: token } }
      );
      setAds([...ads, res.data]);
      setNewAd({ title: '', description: '', price: '', category: '' });
    } catch (error) {
      alert('Failed to create ad. Make sure you are logged in.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ads</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Titre"
          value={newAd.title}
          onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={newAd.description}
          onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
          style={{ ...styles.input, height: '100px' }}
        />
        <input
          type="number"
          placeholder="Prix"
          value={newAd.price}
          onChange={(e) => setNewAd({ ...newAd, price: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={newAd.category}
          onChange={(e) => setNewAd({ ...newAd, category: e.target.value })}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Ajouter une annonce
        </button>
      </form>
      <div style={styles.adsContainer}>
        {ads.map((ad) => (
          <div key={ad._id} style={styles.adCard}>
            <h3>{ad.title}</h3>
            <p><strong>Prix:</strong> {ad.price} €</p>
            <Link to={`/ads/${ad._id}`} style={styles.detailsLink}>
            Voir les détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  adsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    minWidth: '500px'
  },
  adCard: {
    flex: '1 1 calc(50% - 1rem)',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default Ads;
