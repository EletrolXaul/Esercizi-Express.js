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

export function setupSomma() {
  return {
    id: "esercizio3",
    title: "Calcolatore Somma",
    icon: "➕",
    template: `
        <div class="flex gap-4 mb-3">
          <input type="number" id="num1" placeholder="Primo numero" 
                 class="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
          <input type="number" id="num2" placeholder="Secondo numero" 
                 class="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" />
        </div>
        <button onclick="somma()" 
                class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
          Calcola
        </button>
        <div id="risultatoSomma" class="mt-6 p-4 bg-gray-50 rounded-xl text-gray-700 min-h-[80px] border border-gray-100"></div>
      `,
    async handler() {
      const num1 = document.getElementById("num1").value;
      const num2 = document.getElementById("num2").value;
      const response = await fetch(`/esercizio3/somma?a=${num1}&b=${num2}`);
      const data = await response.json();
      document.getElementById("risultatoSomma").innerText = data.messaggio;
    },
  };
}
