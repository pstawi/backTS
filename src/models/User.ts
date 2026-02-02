/**
 * Modèle Sequelize pour la table User
 * Définit la structure et les contraintes de la table utilisateurs
 */

import { Model, InferAttributes, CreationOptional, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

/**
 * Classe User représentant un utilisateur dans la base de données
 * Hérite de Model Sequelize avec typage TypeScript strict
 */
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;        // ID auto-incrémenté
    declare username: string;                     // Nom d'utilisateur (requis)
    declare email: string;                        // Email (requis, unique)
    declare password: string;                      // Mot de passe (requis)
    declare createdAt: CreationOptional<Date>;    // Date de création (auto)
    declare updatedAt: CreationOptional<Date>;    // Date de mise à jour (auto)
}

/**
 * Initialisation du modèle User avec Sequelize
 * Définit les types de colonnes, contraintes et options du modèle
 */
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,          // Clé primaire
            autoIncrement: true        // Auto-incrémentation
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false           // Champ obligatoire
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,          // Champ obligatoire
            unique: true               // Contrainte d'unicité
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false           // Champ obligatoire
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW // Date actuelle par défaut
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW // Date actuelle par défaut
        }
    },
    {
        sequelize,                    // Instance Sequelize à utiliser
        modelName: 'User',            // Nom du modèle dans Sequelize
        timestamps: true              // Active createdAt et updatedAt automatiquement
    }
);