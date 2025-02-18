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
    document.getElementById("risultatoAnalisi").innerText = 
      `✅ ${data.messaggio}\n🔄 Sostituzioni effettuate: ${data.sostituzioni}`;
    showToast('Parola sostituita con successo', 'success');
  } catch (error) {
    showToast('Errore durante la sostituzione', 'error');
  }
};

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