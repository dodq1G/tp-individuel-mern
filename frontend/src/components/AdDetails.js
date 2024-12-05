import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ads/${id}`);
        setAd(res.data);
      } catch (error) {
        console.error('Error fetching ad details:', error);
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
    ←
    </button>
    <div style={styles.container}>
      <h1 style={styles.title}>{ad.title}</h1>
      <p style={styles.text}><strong>Description:</strong> {ad.description}</p>
      <p style={styles.text}><strong>Price:</strong> {ad.price} €</p>
      <p style={styles.text}><strong>Category:</strong> {ad.category}</p>
      <p style={styles.text}><strong>Author:</strong> {ad.author?.username || 'Unknown'}</p>
    </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    marginTop: '1rem',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  backButton: {
    marginTop: '2rem',
    padding: '0.8rem 1.5rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#555',
    fontWeight: 'bold',
  },
};

export default AdDetails;
