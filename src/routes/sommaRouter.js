const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

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

module.exports = router;