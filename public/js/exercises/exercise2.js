export function setupConvertitore() {
  return {
    id: "esercizio2",
    title: "Convertitore KM/Miglia",
    icon: "🔄",
    template: `
        <div class="flex gap-4">
          <input type="number" id="km" placeholder="Inserisci i km" 
                 class="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
          <button onclick="converti()" 
                  class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
            Converti
          </button>
        </div>
        <div id="risultatoConversione" class="mt-6 p-4 bg-gray-50 rounded-xl text-gray-700 min-h-[80px] border border-gray-100"></div>
      `,
    async handler() {
      const km = document.getElementById("km").value;
      const response = await fetch(`/esercizio2/converti?k=${km}`);
      const data = await response.json();
      document.getElementById(
        "risultatoConversione"
      ).innerText = `${data.chilometri} km = ${data.miglia} miglia`;
    },
  };
}
