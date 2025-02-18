const express = require('express');
const path = require('path');
const FileHandler = require('../utils/fileHandler');
const router = express.Router();

const fileHandler = new FileHandler(path.join(__dirname, '../../testo.txt'));

function analizzaTesto(testo) {
  if (!testo) return null;
  
  const parole = testo.toLowerCase().split(/\s+/).filter(p => p.length > 0);
  const caratteri = testo.length;
  const vocali = (testo.match(/[aeiouàèéìòù]/gi) || []).length;
  const consonanti = (testo.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length;
  
  const parolaLunga = parole.reduce((a, b) => a.length >= b.length ? a : b, "");
  const parolaCorta = parole.reduce((a, b) => a.length <= b.length ? a : b, parole[0] || "");
  
  const frequenza = {};
  parole.forEach(parola => {
    frequenza[parola] = (frequenza[parola] || 0) + 1;
  });
  
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

// POST per salvare il testo
router.post("/", express.json(), async (req, res) => {
  const { testo } = req.body;
  
  if (!testo) {
    return res.status(400).json({
      errore: "Il campo 'testo' è obbligatorio nel body"
    });
  }

  const result = await fileHandler.writeFile(testo);
  if (!result.success) {
    return res.status(500).json({ errore: result.error });
  }
  res.json({ messaggio: result.message });
});

// GET per leggere e analizzare il testo
router.get("/", async (req, res) => {
  const result = await fileHandler.readFile();
  if (!result.success) {
    return res.status(500).json({ errore: result.error });
  }
  const analisi = analizzaTesto(result.data);
  res.json(analisi);
});

// DELETE per cancellare il contenuto
router.delete("/", async (req, res) => {
  const result = await fileHandler.clearFile();
  if (!result.success) {
    return res.status(500).json({ errore: result.error });
  }
  res.json({ messaggio: result.message });
});

// POST per sostituire parole
router.post("/cambia-parola", express.json(), async (req, res) => {
  const { parola_vecchia, parola_nuova } = req.body;
  
  if (!parola_vecchia || !parola_nuova) {
    return res.status(400).json({
      errore: "Specificare sia parola_vecchia che parola_nuova"
    });
  }

  const result = await fileHandler.replaceWord(parola_vecchia, parola_nuova);
  if (!result.success) {
    return res.status(500).json({ errore: result.error });
  }
  res.json({
    messaggio: result.message,
    sostituzioni: result.sostituzioni
  });
});

module.exports = router;