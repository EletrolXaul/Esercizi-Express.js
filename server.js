const express = require('express');
const app = express();
const port = 3000;

// Array di frasi casuali
const frasi = [
    "La vita è come una scatola di cioccolatini, non sai mai quello che ti capita.",
    "Nel mezzo del cammin di nostra vita...",
    "Che la forza sia con te!",
    "Houston, abbiamo un problema.",
    "Elementare, Watson!",
    "Il tempo è denaro.",
    "La conoscenza è potere.",
    "La pazienza è la virtù dei forti.",
    "Chi trova un amico trova un tesoro.",
    "L'unione fa la forza."
];

// Route per ottenere una frase casuale
app.get('/frase', (req, res) => {
    // Genera un indice casuale
    const indiceRandom = Math.floor(Math.random() * frasi.length);
    // Seleziona e invia la frase casuale
    res.json({ frase: frasi[indiceRandom] });
});

// Avvio del server
app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});