import express from 'express';
import { sequelize } from './config/database';

const app = express();
const PORT = 3000;

app.use(express.json());


// fonction async de démarrage serveur avec bdd
async function start(): Promise<void> {
    // connexion bdd
    await sequelize.authenticate();
    console.log('connexion bdd OK');

    // check connexion bdd et sync des models
    await sequelize.sync({ alter: true})
    console.log('database OK');

    // démarrage du server
    app.listen(PORT, () => {
    console.log("serveur OK");
})

    
}

// lancement de du serveur
start();