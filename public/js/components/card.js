export function createExerciseCard({ id, title, icon, template }) {
    return `
      <div class="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            ${title}
          </h2>
          <span class="text-3xl">${icon}</span>
        </div>
        <div class="exercise-content" data-exercise-id="${id}">
          ${template}
        </div>
      </div>
    `;
  }