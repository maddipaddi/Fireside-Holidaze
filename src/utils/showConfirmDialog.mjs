export function showConfirmDialog(message) {
  return new Promise((resolve) => {
    const existing = document.getElementById("popup-confirm");
    if (existing) existing.remove();

    const wrapper = document.createElement("div");
    wrapper.id = "popup-confirm";
    wrapper.className =
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50";

    const box = document.createElement("div");
    box.className =
      "relative rounded-2xl shadow-xl p-6 max-w-sm text-center bg-copy text-background dark:bg-background dark:text-copy border border-background dark:border-secondary";

    const icon = `
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#854D0E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    `;

    box.innerHTML = `
      <button class="absolute top-2 right-3 text-xl font-bold hover:opacity-70" aria-label="Close message">&times;</button>
      ${icon}
      <h2 class="text-xl font-bold mb-2">Are you sure?</h2>
      <p class="mb-4">${message}</p>
      <div class="flex justify-center gap-4">
        <button class="confirm-yes bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded">
          Yes, delete
        </button>
        <button class="confirm-no bg-gray-300 hover:bg-gray-400 text-black font-bold px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    `;

    // Lukk med X
    box
      .querySelector("button[aria-label='Close message']")
      .addEventListener("click", () => {
        wrapper.remove();
        resolve(false);
      });

    // Håndter valg
    box.querySelector(".confirm-yes").addEventListener("click", () => {
      wrapper.remove();
      resolve(true);
    });

    box.querySelector(".confirm-no").addEventListener("click", () => {
      wrapper.remove();
      resolve(false);
    });

    wrapper.appendChild(box);
    document.body.appendChild(wrapper);
  });
}
