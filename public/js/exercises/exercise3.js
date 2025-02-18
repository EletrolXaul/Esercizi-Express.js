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
    title: "Calcolatrice",
    icon: "🧮",
    template: `
      <div class="calculator-container bg-gray-800 rounded-2xl p-4 max-w-[320px] mx-auto">
        <!-- Display -->
        <div class="bg-gray-900 rounded-xl p-4 mb-4">
          <div id="preview" class="text-right text-gray-400 text-sm h-5 mb-1"></div>
          <div id="display" class="text-right text-white text-4xl font-bold h-12 overflow-hidden">0</div>
        </div>
        
        <!-- Tastierino numerico -->
        <div class="calculator-grid grid grid-cols-4 gap-2">
          <!-- Row 1 -->
          <button onclick="pulisciDisplay()" class="calc-btn col-span-2 bg-red-500 hover:bg-red-600">AC</button>
          <button onclick="cancellaUltimo()" class="calc-btn bg-orange-500 hover:bg-orange-600">⌫</button>
          <button onclick="gestisciInput('/')" class="calc-btn bg-blue-500 hover:bg-blue-600">÷</button>
          
          <!-- Row 2 -->
          <button onclick="gestisciInput('7')" class="calc-btn bg-gray-700 hover:bg-gray-600">7</button>
          <button onclick="gestisciInput('8')" class="calc-btn bg-gray-700 hover:bg-gray-600">8</button>
          <button onclick="gestisciInput('9')" class="calc-btn bg-gray-700 hover:bg-gray-600">9</button>
          <button onclick="gestisciInput('*')" class="calc-btn bg-blue-500 hover:bg-blue-600">×</button>
          
          <!-- Row 3 -->
          <button onclick="gestisciInput('4')" class="calc-btn bg-gray-700 hover:bg-gray-600">4</button>
          <button onclick="gestisciInput('5')" class="calc-btn bg-gray-700 hover:bg-gray-600">5</button>
          <button onclick="gestisciInput('6')" class="calc-btn bg-gray-700 hover:bg-gray-600">6</button>
          <button onclick="gestisciInput('-')" class="calc-btn bg-blue-500 hover:bg-blue-600">−</button>
          
          <!-- Row 4 -->
          <button onclick="gestisciInput('1')" class="calc-btn bg-gray-700 hover:bg-gray-600">1</button>
          <button onclick="gestisciInput('2')" class="calc-btn bg-gray-700 hover:bg-gray-600">2</button>
          <button onclick="gestisciInput('3')" class="calc-btn bg-gray-700 hover:bg-gray-600">3</button>
          <button onclick="gestisciInput('+')" class="calc-btn bg-blue-500 hover:bg-blue-600">+</button>
          
          <!-- Row 5 -->
          <button onclick="gestisciInput('0')" class="calc-btn col-span-2 bg-gray-700 hover:bg-gray-600">0</button>
          <button onclick="gestisciInput('.')" class="calc-btn bg-gray-700 hover:bg-gray-600">.</button>
          <button onclick="calcolaRisultato()" class="calc-btn bg-green-500 hover:bg-green-600">=</button>
        </div>
      </div>
    `,
    style: `
      .calculator-container {
        @apply shadow-2xl;
      }
      .calculator-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: minmax(3.5rem, auto);
        gap: 0.5rem;
      }
      .calc-btn {
        @apply h-14 w-full rounded-xl text-white text-xl font-semibold
               transition-all duration-200 shadow-sm
               focus:outline-none focus:ring-2 focus:ring-opacity-50 active:scale-95;
      }
    `
  };
}
