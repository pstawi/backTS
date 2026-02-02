/**
 * Contrôleurs pour la gestion des utilisateurs
 * Gère la logique métier pour les opérations CRUD sur les utilisateurs
 */

import { Request, Response } from "express";
import { User } from "../models/User";

/**
 * Crée un nouvel utilisateur dans la base de données
 * @param req - Requête Express contenant les données utilisateur (username, email, password)
 * @param res - Réponse Express
 * @returns Status 201 avec l'utilisateur créé ou 500 en cas d'erreur
 */
export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        console.log("🔍 Création d'utilisateur - Données reçues:", req.body);
        // Extraction des données du body de la requête
        const {username, email, password} = req.body

        // Création de l'utilisateur dans la base de données via Sequelize
        const user = await User.create({username, email, password})
        console.log("✅ Utilisateur créé:", user);
        res.status(201).json({user})
        
    } catch (error) {
        console.error("❌ ERREUR createUser:", error);
        res.status(500).json({error: "Erreur lors de la création de l'utilisateur", details: String(error)});
    }
}

/**
 * Récupère tous les utilisateurs de la base de données
 * @param _req - Requête Express (non utilisée)
 * @param res - Réponse Express
 * @returns Status 200 avec la liste des utilisateurs ou 500 en cas d'erreur
 */
export async function getUsers(_req: Request, res: Response): Promise<void> {
    try {
        console.log("[CTRL] Tentative de récupération des utilisateurs");
        console.log("[CTRL] User model:", typeof User, User === undefined);
        // TODO: Remplacer par une vraie requête à la base de données
        // const users = await User.findAll();
        const users = [{id: 1, username: "test", email: "test@test.com"}];  // DONNEES DE TEST
        console.log("[CTRL] Utilisateurs récupérés:", users);
        res.status(200).json({users})
    } catch (error: any) {
        console.error("[CTRL] ERREUR getUsers:", error.message);
        console.error("[CTRL] Stack:", error.stack);
        res.status(500).json({error: "Erreur lors de la récupération des utilisateurs", details: error.message || String(error)})
    }
}

/**
 * Récupère un utilisateur spécifique par son ID
 * @param req - Requête Express contenant l'ID dans les paramètres d'URL
 * @param res - Réponse Express
 * @returns Status 200 avec l'utilisateur trouvé ou erreur si non trouvé
 */
export async function getUserById(req: Request<{id: string}>, res: Response): Promise<void> {
    try {
        // Conversion de l'ID string en nombre
        const id = parseInt(req.params.id, 10)
        // Recherche de l'utilisateur par clé primaire
        const user = await User.findByPk(id)
        res.status(200).json({user})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: "Erreur lors de la récupération de l'utilisateur", details: String(error)})
    }
}

/**
 * Met à jour un utilisateur existant par son ID
 * @param req - Requête Express contenant l'ID dans les paramètres et les nouvelles données dans le body
 * @param res - Réponse Express
 * @returns Status 200 avec l'utilisateur mis à jour, 404 si non trouvé, ou 500 en cas d'erreur
 */
export async function updateUserById(req: Request<{id: string}>, res: Response): Promise<void> {
    try {
        // Conversion de l'ID string en nombre
        const id = parseInt(req.params.id, 10)
        // Extraction des nouvelles données du body
        const {username, email, password} = req.body
        // Recherche de l'utilisateur à mettre à jour
        const user = await User.findByPk(id)
        
        if (user) {
            // Mise à jour des propriétés de l'utilisateur
            user.username = username
            user.email = email
            user.password = password
            // Sauvegarde des modifications dans la base de données
            await user.save()
            res.status(200).json({user})
        } else {
            res.status(404).json({message: "User not found"})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erreur lors de la mise à jour de l'utilisateur", details: String(error)})
    }
}

/**
 * Supprime un utilisateur de la base de données par son ID
 * @param req - Requête Express contenant l'ID dans les paramètres d'URL
 * @param res - Réponse Express
 * @returns Status 200 avec message de confirmation, 404 si non trouvé, ou 500 en cas d'erreur
 */
export async function deleteUserById(req: Request<{id: string}>, res: Response): Promise<void> {
    try {
        // Conversion de l'ID string en nombre
        const id = parseInt(req.params.id, 10)
        // Recherche de l'utilisateur à supprimer
        const user = await User.findByPk(id)
        
        if (user) {
            // Suppression de l'utilisateur de la base de données
            await user.destroy()
            res.status(200).json({message: "User deleted"})
        } else {
            res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Erreur lors de la suppression de l'utilisateur", details: String(error)})
    }
}

