export function setupAnalisiTesto() {
  return {
    id: "esercizio4_1",
    title: "Analisi Testo",
    icon: "📊",
    template: `
        <div class="space-y-4">
          <button onclick="analizzaTesto()" 
                  class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            Analizza Testo
          </button>
          
          <div class="border-t pt-4">
            <h3 class="font-semibold mb-2">Sostituisci Parola</h3>
            <div class="flex gap-2">
              <input type="text" id="parolaVecchia" placeholder="Parola da sostituire" 
                     class="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
              <input type="text" id="parolaNuova" placeholder="Nuova parola" 
                     class="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
            </div>
            <button onclick="sostituisciParola()" 
                    class="mt-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              Sostituisci
            </button>
          </div>
          
          <div id="risultatoAnalisi" class="mt-6 p-4 bg-gray-50 rounded-xl text-gray-700 min-h-[80px] border border-gray-100 whitespace-pre-line"></div>
        </div>
      `,
    async handler() {},
  };
}
