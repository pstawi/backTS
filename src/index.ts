/**
 * Point d'entrée principal de l'application Express
 * Configure le serveur, les middlewares, les routes et la connexion à la base de données
 */

import express from 'express';
import { sequelize } from './models';
// Import des modèles pour les initialiser (nécessaire pour que Sequelize les enregistre)
import './models/User';
import './models/Commande';
import  usersRoutes from './routes/usersRoutes';

console.log("[START] Démarrage de l'application");
const app = express();
const PORT = 5000;

console.log("[CONFIG] Configuration d'Express");
// Middleware pour parser les requêtes JSON dans le body
app.use(express.json());

/**
 * Middleware de debug pour logger toutes les requêtes entrantes
 * Affiche la méthode HTTP et le chemin de chaque requête
 */
app.use((_req, _res, next) => {
    console.log(`[REQUEST] ${_req.method} ${_req.path}`);
    next();
});

console.log("[ROUTES] Enregistrement des routes");
// Enregistrement des routes utilisateurs sous le préfixe /api
app.use('/api', usersRoutes);

/**
 * Middleware de gestion des routes non trouvées (404)
 * Doit être placé après toutes les autres routes
 */
app.use((req, res) => {
    console.log(`[404] Route non trouvée: ${req.method} ${req.path}`);
    res.status(404).json({error: "Route not found"});
});

/**
 * Fonction asynchrone de démarrage du serveur avec connexion à la base de données
 * Établit la connexion à la BDD puis démarre le serveur Express
 */
async function start(): Promise<void> {
    // Authentification et connexion à la base de données MySQL
    await sequelize.authenticate();
    console.log('[DB] connexion bdd OK');

    // Synchronisation des modèles avec la base de données (optionnel, commenté par défaut)
    // Décommenter pour synchroniser automatiquement les schémas (attention en production)
    //await sequelize.sync({ alter: true})
    console.log('[DB] database OK');

    // Démarrage du serveur Express sur le port défini
    await new Promise<void>((resolve) => {
        app.listen(PORT, () => {
            console.log(`[SERVER] serveur OK - Ecoute sur le port ${PORT}`);
            resolve();
        });
    });
}

// Lancement du serveur avec gestion des erreurs
start().catch(err => {
    console.error('[ERROR] Erreur lors du démarrage:', err);
    process.exit(1);
});