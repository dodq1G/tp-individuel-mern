# Le Bon Coin Clone

## Description

Le Bon Coin Clone est une application web MERN (MongoDB, Express, React, Node.js) inspirée de la plateforme **Le Bon Coin**. Elle permet aux utilisateurs de s'inscrire, se connecter, créer des annonces, consulter des annonces d'autres utilisateurs et visualiser les détails d'une annonce.

---

## Fonctionnalités principales

1. **Système d'authentification**
   - Inscription avec hachage sécurisé des mots de passe (**bcrypt**).
   - Connexion avec génération d'un token sécurisé (**JWT**).
   - Accès protégé pour les fonctionnalités sensibles (CRUD annonces).

2. **Gestion des annonces (CRUD)**
   - Création, lecture, modification et suppression d'annonces.
   - Les annonces incluent un titre, une description, un prix, une catégorie et l'auteur.

3. **Consultation des annonces**
   - Affichage de toutes les annonces.
   - Consultation des détails d'une annonce (titre, description, prix, catégorie, auteur).

4. **Navigation intuitive**
   - Barre de navigation dynamique pour les utilisateurs connectés et non connectés.
   - Bouton de retour sur la page des détails.

---

## Stack technique

### Frontend
- **React** : Interface utilisateur dynamique et responsive.
- **React Router** : Navigation entre les pages.
- **Axios** : Requêtes HTTP pour communiquer avec le backend.

### Backend
- **Node.js** : Serveur backend.
- **Express** : Gestion des routes et des middlewares.
- **MongoDB** : Base de données NoSQL pour stocker les utilisateurs et annonces.
- **Mongoose** : Modélisation des données MongoDB.
- **JWT** : Authentification sécurisée.
- **bcrypt** : Hachage des mots de passe.

### Outils supplémentaires
- **CORS** : Autorisation des requêtes cross-origin.
- **dotenv** : Gestion des variables d'environnement.

---

## Installation et exécution

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (local ou MongoDB Atlas)

### Instructions

1. **Cloner le dépôt**
   ```bash
   git [clone https://github.com/tp-individuel-mern/boncoin-clone.git](https://github.com/dodq1G/tp-individuel-mern.git)
   cd tp-individuel-mern
   ```

2. **Configurer le backend**
   - Naviguez dans le dossier `backend` :
     ```bash
     cd backend
     ```
   - Installer les dépendances :
     ```bash
     npm install
     ```
   - Créez un fichier `.env` avec les variables suivantes :
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/leboncoin
     JWT_SECRET=your_jwt_secret
     ```
   - Lancer le serveur backend :
     ```bash
     node server.js
     ```

3. **Configurer le frontend**
   - Naviguez dans le dossier `frontend` :
     ```bash
     cd frontend
     ```
   - Installer les dépendances :
     ```bash
     npm install
     ```
   - Lancer le serveur frontend :
     ```bash
     npm start
     ```

4. **Accéder à l'application**
   - Frontend : [http://localhost:3000](http://localhost:3000)
   - Backend : [http://localhost:5000](http://localhost:5000)

---

## Fonctionnement

1. **S'inscrire**
   - Accéder à la page **Register** via la navigation.
   - Créer un compte avec un email, un nom d'utilisateur et un mot de passe.

2. **Se connecter**
   - Utiliser les identifiants pour se connecter via la page **Login**.
   - Une fois connecté, le token JWT est stocké dans le `localStorage`.

3. **Gérer les annonces**
   - Naviguer vers **Ads** pour créer ou consulter des annonces.
   - Cliquer sur une annonce pour voir les détails.

4. **Se déconnecter**
   - Utiliser le bouton **Logout** dans la barre de navigation pour supprimer le token JWT et revenir à la page de connexion.

---

## Débogage et outils

1. **MongoDB Compass**
   - Visualiser et manipuler les collections `users` et `ads`.

2. **Postman**
   - Tester les routes API du backend (inscription, connexion, gestion des annonces).

---

## Améliorations futures

- Ajout d'un système de filtres par catégorie ou prix.
- Ajout de la pagination pour les annonces.
- Mise en place d'une validation avancée des champs.
- Intégration d'images pour les annonces.

---

## Auteur
Projet réalisé par **[Votre Nom]** dans le cadre d'un TP MERN. Si vous avez des questions ou suggestions, n'hésitez pas à me contacter.

