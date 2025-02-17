const express = require('express');
const app = express();
const port = 3000;

// Middleware per gestire il routing
const fraseRouter = express.Router();
const convertiRouter = express.Router();
// Aggiungi questo dopo la dichiarazione degli altri router
const sommaRouter = express.Router();

// ---------- ESERCIZIO 1: Frasi Random ----------
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

fraseRouter.get('/', (req, res) => {
    const indiceRandom = Math.floor(Math.random() * frasi.length);
    res.json({ frase: frasi[indiceRandom] });
});

// ---------- ESERCIZIO 2: Convertitore ----------
convertiRouter.get('/', (req, res) => {
    const km = parseFloat(req.query.k);
    
    if (isNaN(km)) {
        return res.status(400).json({ 
            errore: "Inserisci un valore numerico valido per i chilometri" 
        });
    }

    const miglia = km * 0.621371;
    
    res.json({
        chilometri: km,
        miglia: miglia.toFixed(2)
    });
});

// ---------- ESERCIZIO 3: Somma ----------
sommaRouter.get('/', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    
    // Verifica se entrambi i parametri sono numeri validi
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({
            errore: "Inserisci valori numerici validi per a e b"
        });
    }
    
    const somma = a + b;
    
    res.json({
        messaggio: `La somma è ${somma}`,
        valori: {
            a: a,
            b: b,
            risultato: somma
        }
    });
});

// Registra i router con i loro prefissi
app.use('/esercizio1/frase', fraseRouter);
app.use('/esercizio2/converti', convertiRouter);
// Aggiungi questa linea con gli altri app.use()
app.use('/esercizio3/somma', sommaRouter);

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});