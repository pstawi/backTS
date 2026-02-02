/**
 * Fichier d'index pour les modèles Sequelize
 * Définit les relations entre les modèles et exporte toutes les instances
 */

import { sequelize } from "../config/database";
import { User } from "./User";
import { Commande } from "./Commande";

/**
 * Définition des relations entre les modèles
 * 
 * Relation One-to-Many: Un utilisateur peut avoir plusieurs commandes
 * - User.hasMany(Commande) : Un utilisateur possède plusieurs commandes
 * - Commande.belongsTo(User) : Une commande appartient à un utilisateur
 */
User.hasMany(Commande, { foreignKey: 'userId', as: 'commandes' });
Commande.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Export de l'instance Sequelize et de tous les modèles
export { sequelize, User, Commande };
