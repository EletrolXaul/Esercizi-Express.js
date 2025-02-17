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

// ---------- ESERCIZIO 4: Gestione File di Testo Base ----------
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

// ---------- ESERCIZIO 4.1: Analisi e Modifica Testo ----------
// Funzioni di utilità per l'analisi del testo
function analizzaTesto(testo) {
  if (!testo) return null;
  
  const parole = testo.toLowerCase().split(/\s+/).filter(p => p.length > 0);
  const caratteri = testo.length;
  const vocali = (testo.match(/[aeiouàèéìòù]/gi) || []).length;
  const consonanti = (testo.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
  
  // Trova la parola più lunga e più corta
  const parolaLunga = parole.reduce((a, b) => a.length >= b.length ? a : b, "");
  const parolaCorta = parole.reduce((a, b) => a.length <= b.length ? a : b, parole[0] || "");
  
  // Conta occorrenze delle parole
  const frequenza = {};
  parole.forEach(parola => {
    frequenza[parola] = (frequenza[parola] || 0) + 1;
  });
  
  // Trova la parola più ripetuta
  let parolaRipetuta = "";
  let maxRipetizioni = 0;
  
  Object.entries(frequenza).forEach(([parola, count]) => {
    if (count > maxRipetizioni) {
      parolaRipetuta = parola;
      maxRipetizioni = count;
    }
  });

  return {
    testo,
    num_parole: parole.length,
    num_caratteri: caratteri,
    num_vocali: vocali,
    num_consonanti: consonanti,
    parola_piu_lunga: parolaLunga,
    parola_piu_corta: parolaCorta,
    parola_piu_ripetuta: parolaRipetuta,
    parola_piu_ripetuta_volte: maxRipetizioni
  };
}

// Modifica il GET esistente per includere l'analisi
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
      
      const analisi = analizzaTesto(data);
      res.json(analisi);
    });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({
      errore: "Errore durante l'accesso al file"
    });
  }
});

// Nuova route per cambiare parola
testoRouter.post("/cambia-parola", express.json(), (req, res) => {
  try {
    const { parola_vecchia, parola_nuova } = req.body;
    
    if (!parola_vecchia || !parola_nuova) {
      return res.status(400).json({
        errore: "Specificare sia parola_vecchia che parola_nuova"
      });
    }

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        console.error('Errore durante la lettura:', err);
        return res.status(500).json({
          errore: "Errore durante la lettura del file"
        });
      }

      // Verifica se la parola vecchia esiste nel testo
      if (!data.includes(parola_vecchia)) {
        return res.status(404).json({
          errore: "La parola specificata non è presente nel testo"
        });
      }

      // Sostituisce tutte le occorrenze della parola
      const nuovoTesto = data.replace(new RegExp(parola_vecchia, 'g'), parola_nuova);

      fs.writeFile(FILE_PATH, nuovoTesto, 'utf8', (err) => {
        if (err) {
          console.error('Errore durante il salvataggio:', err);
          return res.status(500).json({
            errore: "Errore durante il salvataggio delle modifiche"
          });
        }
        res.json({ 
          messaggio: "Parola sostituita con successo",
          sostituzioni: (data.match(new RegExp(parola_vecchia, 'g')) || []).length
        });
      });
    });
  } catch (error) {
    console.error('Errore:', error);
    res.status(500).json({
      errore: "Errore durante l'elaborazione della richiesta"
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
