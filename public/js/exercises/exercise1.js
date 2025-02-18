// Esercizio 1: Frasi Random
export function setupFraseRandom() {
  return {
    id: "esercizio1",
    title: "Frasi Random",
    icon: "🎲",
    template: `
        <button onclick="generaFrase()" 
                class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
          Genera Frase
        </button>
        <div id="risultatoFrase" class="mt-6 p-4 bg-gray-50 rounded-xl text-gray-700 min-h-[80px] border border-gray-100"></div>
      `,
    async handler() {
      const response = await fetch("/esercizio1/frase");
      const data = await response.json();
      document.getElementById("risultatoFrase").innerText = data.frase;
    },
  };
}
