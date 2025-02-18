const fs = require('fs');
const path = require('path');

class FileHandler {
  constructor(filePath) {
    this.filePath = filePath;
    this.initializeFile();
  }

  // Inizializza il file se non esiste
  initializeFile() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '');
    }
  }

  // Legge il contenuto del file
  async readFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf8');
      return { success: true, data };
    } catch (error) {
      console.error('Errore durante la lettura:', error);
      return { success: false, error: 'Errore durante la lettura del file' };
    }
  }

  // Scrive nel file
  async writeFile(content) {
    try {
      await fs.promises.writeFile(this.filePath, content, 'utf8');
      return { success: true, message: 'File salvato con successo' };
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
      return { success: false, error: 'Errore durante il salvataggio del file' };
    }
  }

  // Cancella il contenuto del file
  async clearFile() {
    try {
      await fs.promises.writeFile(this.filePath, '', 'utf8');
      return { success: true, message: 'Contenuto del file cancellato con successo' };
    } catch (error) {
      console.error('Errore durante la cancellazione:', error);
      return { success: false, error: 'Errore durante la cancellazione del file' };
    }
  }

  // Sostituisce una parola nel testo
  async replaceWord(oldWord, newWord) {
    try {
      const { success, data, error } = await this.readFile();
      if (!success) return { success: false, error };

      if (!data.includes(oldWord)) {
        return { success: false, error: 'La parola specificata non è presente nel testo' };
      }

      const newContent = data.replace(new RegExp(oldWord, 'g'), newWord);
      const writeResult = await this.writeFile(newContent);
      if (!writeResult.success) return writeResult;

      const occurrences = (data.match(new RegExp(oldWord, 'g')) || []).length;
      return {
        success: true,
        message: 'Parola sostituita con successo',
        sostituzioni: occurrences
      };
    } catch (error) {
      console.error('Errore durante la sostituzione:', error);
      return { success: false, error: 'Errore durante la sostituzione della parola' };
    }
  }
}

module.exports = FileHandler;