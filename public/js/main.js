import { setupFraseRandom } from './exercises/exercise1.js';
import { setupConvertitore } from './exercises/exercise2.js';
import { setupSomma } from './exercises/exercise3.js';
import { setupGestioneTesto } from './exercises/exercise4.js';
import { setupAnalisiTesto } from './exercises/exercise4_1.js';
import { createExerciseCard } from './components/card.js';
import { showToast } from './components/toast.js';

// Definisci le funzioni globalmente
window.generaFrase = async () => {
  try {
    const response = await fetch("/esercizio1/frase");
    const data = await response.json();
    document.getElementById("risultatoFrase").innerText = data.frase;
    showToast('Frase generata con successo', 'success');
  } catch (error) {
    showToast('Errore durante la generazione della frase', 'error');
  }
};

window.converti = async () => {
  try {
    const km = document.getElementById("km").value;
    const response = await fetch(`/esercizio2/converti?k=${km}`);
    const data = await response.json();
    document.getElementById("risultatoConversione").innerText = 
      `${data.chilometri} km = ${data.miglia} miglia`;
    showToast('Conversione completata', 'success');
  } catch (error) {
    showToast('Errore durante la conversione', 'error');
  }
};

window.somma = async () => {
  try {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const response = await fetch(`/esercizio3/somma?a=${num1}&b=${num2}`);
    const data = await response.json();
    document.getElementById("risultatoSomma").innerText = data.messaggio;
    showToast('Somma calcolata', 'success');
  } catch (error) {
    showToast('Errore durante il calcolo', 'error');
  }
};

window.salvaTesto = async () => {
  try {
    const testo = document.getElementById("testo").value;
    const response = await fetch("/esercizio4/testo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testo })
    });
    const data = await response.json();
    document.getElementById("risultatoTesto").innerText = data.messaggio;
    showToast('Testo salvato con successo', 'success');
  } catch (error) {
    showToast('Errore durante il salvataggio', 'error');
  }
};

window.cancellaTesto = async () => {
  try {
    const response = await fetch("/esercizio4/testo", {
      method: "DELETE"
    });
    const data = await response.json();
    document.getElementById("testo").value = "";
    document.getElementById("risultatoTesto").innerText = data.messaggio;
    showToast('Testo cancellato con successo', 'success');
  } catch (error) {
    showToast('Errore durante la cancellazione', 'error');
  }
};

window.analizzaTesto = async () => {
  try {
    const response = await fetch("/esercizio4/testo");
    const data = await response.json();
    const risultato = 
      `📝 Parole: ${data.num_parole}\n` +
      `📏 Caratteri: ${data.num_caratteri}\n` +
      `🔤 Vocali: ${data.num_vocali}\n` +
      `🔠 Consonanti: ${data.num_consonanti}\n` +
      `📈 Parola più lunga: "${data.parola_piu_lunga}"\n` +
      `📉 Parola più corta: "${data.parola_piu_corta}"\n` +
      `🔄 Parola più ripetuta: "${data.parola_piu_ripetuta}" (${data.parola_piu_ripetuta_volte} volte)`;
    document.getElementById("risultatoAnalisi").innerText = risultato;
    showToast('Analisi completata', 'success');
  } catch (error) {
    showToast('Errore durante l\'analisi', 'error');
  }
};

window.sostituisciParola = async () => {
  try {
    const parola_vecchia = document.getElementById("parolaVecchia").value;
    const parola_nuova = document.getElementById("parolaNuova").value;
    const response = await fetch("/esercizio4/testo/cambia-parola", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parola_vecchia, parola_nuova })
    });
    const data = await response.json();
    
    // Aggiorna entrambi i risultati
    document.getElementById("risultatoAnalisi").innerText = 
      `✅ ${data.messaggio}\n🔄 Sostituzioni effettuate: ${data.sostituzioni}`;
    
    // Aggiorna anche il testo nell'esercizio 4
    const testoResponse = await fetch("/esercizio4/testo");
    const testoData = await testoResponse.json();
    document.getElementById("testo").value = testoData.testo;
    
    showToast('Parola sostituita con successo', 'success');
  } catch (error) {
    showToast('Errore durante la sostituzione', 'error');
  }
};

window.calcola = async () => {
  try {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const op = document.getElementById("operazione").value;
    
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Inserisci numeri validi");
    }
    
    let risultato;
    let simbolo = op;
    
    switch(op) {
      case "+":
        risultato = num1 + num2;
        break;
      case "-":
        risultato = num1 - num2;
        break;
      case "*":
        risultato = num1 * num2;
        simbolo = "×";
        break;
      case "/":
        if (num2 === 0) throw new Error("Non puoi dividere per zero");
        risultato = num1 / num2;
        simbolo = "÷";
        break;
    }
    
    document.getElementById("risultatoCalcolo").innerText = 
      `${num1} ${simbolo} ${num2} = ${risultato.toFixed(2)}`;
    showToast('Calcolo completato', 'success');
  } catch (error) {
    document.getElementById("risultatoCalcolo").innerText = `Errore: ${error.message}`;
    showToast(error.message, 'error');
  }
};

// Stato della calcolatrice
let displayValue = '';
let currentOperation = '';
let firstNumber = null;

window.gestisciInput = (valore) => {
  if (valore === '.' && displayValue.includes('.')) return;
  displayValue += valore;
  aggiornaDisplay();
};

window.calcolaRisultato = () => {
  try {
    const risultato = eval(displayValue);
    displayValue = risultato.toString();
    aggiornaDisplay();
    showToast('Calcolo completato', 'success');
  } catch (error) {
    displayValue = '';
    document.getElementById('preview').innerText = 'Errore';
    showToast('Errore nel calcolo', 'error');
  }
};

window.pulisciDisplay = () => {
  displayValue = '';
  aggiornaDisplay();
};

window.cancellaUltimo = () => {
  displayValue = displayValue.slice(0, -1);
  aggiornaDisplay();
};

function aggiornaDisplay() {
  const display = document.getElementById('display');
  const preview = document.getElementById('preview');
  display.innerText = displayValue || '0';
  
  try {
    if (displayValue) {
      const risultato = eval(displayValue);
      preview.innerText = risultato.toString();
    } else {
      preview.innerText = '';
    }
  } catch {
    preview.innerText = 'In attesa...';
  }
}

// Gestione input da tastiera
document.addEventListener('keydown', (e) => {
  if (e.key.match(/[0-9\.\+\-\*\/]/)) {
    gestisciInput(e.key);
  } else if (e.key === 'Enter') {
    calcolaRisultato();
  } else if (e.key === 'Backspace') {
    cancellaUltimo();
  } else if (e.key === 'Escape') {
    pulisciDisplay();
  }
});

const exercises = [
  setupFraseRandom(),
  setupConvertitore(),
  setupSomma(),
  setupGestioneTesto(),
  setupAnalisiTesto()
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#exercises-container');
  exercises.forEach(exercise => {
    const card = createExerciseCard(exercise);
    container.innerHTML += card;
  });

  // Inizializza gli handler degli esercizi
  exercises.forEach(exercise => {
    if (exercise.handler) {
      const content = document.querySelector(`[data-exercise-id="${exercise.id}"]`);
      content.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
          exercise.handler(e);
        }
      });
    }
  });
});