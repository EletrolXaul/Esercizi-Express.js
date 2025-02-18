export function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  
  // Imposta il colore del toast in base al tipo
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  // Rimuovi tutte le classi di colore esistenti e aggiungi quella nuova
  toast.className = `fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300`;
  
  // Imposta il messaggio
  toast.textContent = message;
  
  // Mostra il toast
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  
  // Nascondi il toast dopo 3 secondi
  setTimeout(() => {
    toast.style.transform = 'translateY(100%)';
    toast.style.opacity = '0';
  }, 3000);
}

// Funzione di utilità per mostrare errori
export function showError(message) {
  showToast(message, 'error');
}

// Funzione di utilità per mostrare successi
export function showSuccess(message) {
  showToast(message, 'success');
}