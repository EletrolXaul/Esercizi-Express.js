export function setupSomma() {
  return {
    id: "esercizio3",
    title: "Calcolatrice",
    icon: "🧮",
    template: `
      <div class="calculator-container">
        <!-- Display -->
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div id="preview" class="text-right text-gray-400 text-sm h-5 mb-1"></div>
          <div id="display" class="text-right text-white text-4xl font-bold h-12 overflow-hidden">0</div>
        </div>

        <!-- Griglia tastierino -->
        <div class="calculator-grid">
          <!-- Prima riga -->
          <div class="row">
            <button onclick="pulisciDisplay()" class="calc-btn col-span-2 bg-gradient-to-r from-red-500 to-red-600">AC</button>
            <button onclick="cancellaUltimo()" class="calc-btn bg-gradient-to-r from-orange-500 to-orange-600">⌫</button>
            <button onclick="gestisciInput('/')" class="calc-btn operator">÷</button>
          </div>

          <!-- Seconda riga -->
          <div class="row">
            <button onclick="gestisciInput('7')" class="calc-btn number">7</button>
            <button onclick="gestisciInput('8')" class="calc-btn number">8</button>
            <button onclick="gestisciInput('9')" class="calc-btn number">9</button>
            <button onclick="gestisciInput('*')" class="calc-btn operator">×</button>
          </div>

          <!-- Terza riga -->
          <div class="row">
            <button onclick="gestisciInput('4')" class="calc-btn number">4</button>
            <button onclick="gestisciInput('5')" class="calc-btn number">5</button>
            <button onclick="gestisciInput('6')" class="calc-btn number">6</button>
            <button onclick="gestisciInput('-')" class="calc-btn operator">−</button>
          </div>

          <!-- Quarta riga -->
          <div class="row">
            <button onclick="gestisciInput('1')" class="calc-btn number">1</button>
            <button onclick="gestisciInput('2')" class="calc-btn number">2</button>
            <button onclick="gestisciInput('3')" class="calc-btn number">3</button>
            <button onclick="gestisciInput('+')" class="calc-btn operator">+</button>
          </div>

          <!-- Quinta riga -->
          <div class="row">
            <button onclick="gestisciInput('0')" class="calc-btn number col-span-2">0</button>
            <button onclick="gestisciInput('.')" class="calc-btn number">.</button>
            <button onclick="calcolaRisultato()" class="calc-btn bg-gradient-to-r from-green-500 to-green-600">=</button>
          </div>
        </div>
      </div>
    `,
    style: `
      .calculator-container {
        @apply max-w-[320px] mx-auto bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-3xl shadow-2xl;
      }
      .calculator-grid {
        @apply grid gap-2;
      }
      .row {
        @apply grid grid-cols-4 gap-2;
      }
      .calc-btn {
        @apply h-14 w-full rounded-xl text-white text-xl font-semibold
               transition-all duration-150 shadow-sm
               focus:outline-none focus:ring-2 focus:ring-opacity-50
               active:scale-95;
      }
      .calc-btn.number {
        @apply bg-gray-700 hover:bg-gray-600;
      }
      .calc-btn.operator {
        @apply bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-bold;
      }
      .col-span-2 {
        @apply col-span-2;
      }
    `
  };
}
