/**
 * Routes pour la gestion des utilisateurs
 * Toutes les routes sont préfixées par /api dans le fichier index.ts
 */

import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

/**
 * POST /api/create
 * Crée un nouvel utilisateur
 * Body attendu: { username: string, email: string, password: string }
 */
router.post("/create", userController.createUser);

/**
 * GET /api/users
 * Récupère la liste de tous les utilisateurs
 */
router.get("/users", userController.getUsers);

/**
 * GET /api/users/:id
 * Récupère un utilisateur spécifique par son ID
 * Paramètre: id (number) - L'identifiant de l'utilisateur
 */
router.get("/users/:id", userController.getUserById);

/**
 * PUT /api/users/:id
 * Met à jour un utilisateur existant par son ID
 * Paramètre: id (number) - L'identifiant de l'utilisateur
 * Body attendu: { username?: string, email?: string, password?: string }
 */
router.put("/users/:id", userController.updateUserById);

/**
 * DELETE /api/users/:id
 * Supprime un utilisateur par son ID
 * Paramètre: id (number) - L'identifiant de l'utilisateur
 */
router.delete("/users/:id", userController.deleteUserById);

export default router;