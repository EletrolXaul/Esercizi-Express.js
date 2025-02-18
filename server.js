const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Importa i router
const fraseRouter = require('./src/routes/fraseRouter');
const convertiRouter = require('./src/routes/convertiRouter');
const sommaRouter = require('./src/routes/sommaRouter');
const testoRouter = require('./src/routes/testoRouter');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Registra i router
app.use('/esercizio1/frase', fraseRouter);
app.use('/esercizio2/converti', convertiRouter);
app.use('/esercizio3/somma', sommaRouter);
app.use('/esercizio4/testo', testoRouter);

app.listen(port, () => {
    console.log(`Server in esecuzione su http://localhost:${port}`);
});
