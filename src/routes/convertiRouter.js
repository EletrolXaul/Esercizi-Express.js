const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
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

module.exports = router;