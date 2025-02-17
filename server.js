const express = require("express");
const fs = require("fs"); // Aggiungi questo in cima
const path = require("path"); // Aggiungi questo in cima
const app = express();
const port = 3000;

// Middleware per gestire il routing
const fraseRouter = express.Router();
const convertiRouter = express.Router();
// Aggiungi questo dopo la dichiarazione degli altri router
const sommaRouter = express.Router();
// Dopo gli altri router, aggiungi:
const testoRouter = express.Router();

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
  "L'unione fa la forza.",
];

fraseRouter.get("/", (req, res) => {
  const indiceRandom = Math.floor(Math.random() * frasi.length);
  res.json({ frase: frasi[indiceRandom] });
});

// ---------- ESERCIZIO 2: Convertitore ----------
convertiRouter.get("/", (req, res) => {
  const km = parseFloat(req.query.k);

  if (isNaN(km)) {
    return res.status(400).json({
      errore: "Inserisci un valore numerico valido per i chilometri",
    });
  }

  const miglia = km * 0.621371;

  res.json({
    chilometri: km,
    miglia: miglia.toFixed(2),
  });
});

// ---------- ESERCIZIO 3: Somma ----------
sommaRouter.get("/", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  // Verifica se entrambi i parametri sono numeri validi
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({
      errore: "Inserisci valori numerici validi per a e b",
    });
  }

  const somma = a + b;

  res.json({
    messaggio: `La somma è ${somma}`,
    valori: {
      a: a,
      b: b,
      risultato: somma,
    },
  });
});

// Percorso del file di testo
const FILE_PATH = path.join(__dirname, "testo.txt");

// Verifica esistenza file
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, '');
}

// POST per salvare il testo
testoRouter.post("/", express.json(), (req, res) => {
  const { testo } = req.body;
  
  if (!testo) {
    return res.status(400).json({
      errore: "Il campo 'testo' è obbligatorio nel body"
    });
  }

  fs.writeFile(FILE_PATH, testo, 'utf8', (err) => {
    if (err) {
      console.error('Errore durante il salvataggio:', err);
      return res.status(500).json({
        errore: "Errore durante il salvataggio del file"
      });
    }
    res.json({ messaggio: "Testo salvato con successo" });
  });
});

// DELETE per cancellare il contenuto
testoRouter.delete("/", (req, res) => {
  fs.writeFile(FILE_PATH, "", (err) => {
    if (err) {
      return res.status(500).json({
        errore: "Errore durante la cancellazione del file"
      });
    }
    res.json({ messaggio: "Contenuto del file cancellato con successo" });
  });
});

// GET per leggere il contenuto del file
testoRouter.get("/", (req, res) => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, '');
    }

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        console.error('Errore durante la lettura:', err);
        return res.status(500).json({
          errore: "Errore durante la lettura del file"
        });
      }
      res.json({ testo: data });
    });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({
      errore: "Errore durante l'accesso al file"
    });
  }
});

// Servi i file statici dalla cartella public
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Registra i router con i loro prefissi
app.use("/esercizio1/frase", fraseRouter);
app.use("/esercizio2/converti", convertiRouter);
app.use("/esercizio3/somma", sommaRouter);
app.use("/esercizio4/testo", testoRouter);

app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
