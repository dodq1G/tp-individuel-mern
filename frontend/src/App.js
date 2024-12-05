import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Ads from './components/Ads';
import AdDetails from './components/AdDetails';
import AdminPage from './components/AdminPage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>TP individuel MERN</h1>
          <nav style={styles.nav}>
            {!isAuthenticated ? (
              <>
                <Link to="/login" style={styles.navLink}>
                  Se connecter
                </Link>
                <Link to="/register" style={styles.navLink}>
                  S'enregistrer
                </Link>
              </>
            ) : (
              <>
                <Link to="/ads" style={styles.navLink}>
                  Annonce
                </Link>
                <Link to="/admin" style={styles.navLink}>
                  Administration
                </Link>
                <button
                  style={styles.logoutButton}
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                >
                  Se déconnecter
                </button>
              </>
            )}
          </nav>
        </header>
        <main style={styles.main}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/ads"
              element={isAuthenticated ? <Ads /> : <Navigate to="/login" />}
            />
            <Route
              path="/ads/:id"
              element={isAuthenticated ? <AdDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin"
              element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/ads" : "/login"} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginTop : 0,
    marginBottom : 0,
    marginLeft: '1rem',
    fontSize: '1.8rem',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  navLinkHover: {
    backgroundColor: '#0056b3',
  },
  logoutButton: {
    marginRight: '1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};

export default App;
