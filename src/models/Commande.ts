/**
 * Modèle Sequelize pour la table Commande
 * Définit la structure et les contraintes de la table commandes
 * Une commande est liée à un utilisateur via une clé étrangère
 */

import { Model, InferAttributes, CreationOptional, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

/**
 * Classe Commande représentant une commande dans la base de données
 * Hérite de Model Sequelize avec typage TypeScript strict
 */
export class Commande extends Model<InferAttributes<Commande>, InferCreationAttributes<Commande>> {
    declare id: CreationOptional<number>;        // ID auto-incrémenté
    declare reference: string;                    // Référence de la commande (requis)
    declare totalAmount: number;                  // Montant total de la commande (requis)
    declare userId: number;                       // ID de l'utilisateur propriétaire (clé étrangère)
    declare createdAt: CreationOptional<Date>;    // Date de création (auto)
    declare updatedAt: CreationOptional<Date>;    // Date de mise à jour (auto)
}

/**
 * Initialisation du modèle Commande avec Sequelize
 * Définit les types de colonnes, contraintes et relations avec User
 */
Commande.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,          // Clé primaire
            autoIncrement: true        // Auto-incrémentation
        },
        reference: {
            type: DataTypes.STRING(255),
            allowNull: false           // Champ obligatoire
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),  // Décimal avec 10 chiffres totaux, 2 après la virgule
            allowNull: false           // Champ obligatoire
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,          // Champ obligatoire
            // Clé étrangère vers la table Users
            references: {
                model: 'Users',        // Nom de la table référencée
                key: 'id'              // Colonne référencée
            },
            // En cas de mise à jour de l'ID utilisateur, mettre à jour aussi les commandes
            onUpdate: 'CASCADE',
            // En cas de suppression de l'utilisateur, supprimer aussi ses commandes
            onDelete: 'CASCADE'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW // Date actuelle par défaut
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW // Date actuelle par défaut
        }
    },
    {
        sequelize,                    // Instance Sequelize à utiliser
        modelName: 'Commande',        // Nom du modèle dans Sequelize
        timestamps: true              // Active createdAt et updatedAt automatiquement
    }
);