export function setupGestioneTesto() {
  return {
    id: "esercizio4",
    title: "Gestione Testo",
    icon: "📝",
    template: `
        <textarea id="testo" rows="4" placeholder="Inserisci il testo"
                  class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"></textarea>
        <div class="flex gap-2">
          <button onclick="salvaTesto()" 
                  class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            Salva
          </button>
          <button onclick="cancellaTesto()" 
                  class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            Cancella
          </button>
        </div>
        <div id="risultatoTesto" class="mt-6 p-4 bg-gray-50 rounded-xl text-gray-700 min-h-[80px] border border-gray-100"></div>
      `,
    async handler() {},
  };
}
