const express = require('express');
const router = express.Router();

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

router.get("/", (req, res) => {
  const indiceRandom = Math.floor(Math.random() * frasi.length);
  res.json({ frase: frasi[indiceRandom] });
});

module.exports = router;