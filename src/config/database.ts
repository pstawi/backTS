/**
 * Configuration de la connexion à la base de données MySQL
 * Utilise Sequelize comme ORM pour gérer les interactions avec la base de données
 */

import { Sequelize } from "sequelize";

/**
 * Instance Sequelize configurée pour MySQL
 * Configure la connexion à la base de données avec les paramètres suivants:
 * - host: localhost (serveur MySQL local)
 * - database: backts_cda (nom de la base de données)
 * - username: root (utilisateur MySQL)
 * - password: root (mot de passe MySQL)
 * - dialect: mysql (type de base de données)
 * - logging: console.log (affiche les requêtes SQL dans la console)
 */
const sequelize = new Sequelize({
    host:'localhost',
    // Port MySQL par défaut (3306) - commenté car non nécessaire si port par défaut
    // port:parseInt('3306'),
    database:'backts_cda',
    username:'root',
    password:'root',
    dialect: "mysql",
    // Active le logging des requêtes SQL (utile pour le debug)
    logging: console.log
});

export {sequelize}