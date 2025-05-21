/**
 * Displays a temporary success message popup in the center of the screen.
 * Removes any existing popup before showing a new one.
 * The popup includes a close button and will automatically disappear after 3 seconds.
 *
 * @param {string} message - The success message to display in the popup.
 */

export function showSuccessMessage(message) {
  const existing = document.getElementById("popup-success");
  if (existing) existing.remove();

  const wrapper = document.createElement("div");
  wrapper.id = "popup-success";
  wrapper.className =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50";

  const box = document.createElement("div");
  box.className =
    "relative rounded-2xl shadow-xl p-6 max-w-sm text-center bg-copy text-background dark:bg-background dark:text-copy border border-background dark:border-secondary";

  const icon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#454F17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  `;

  box.innerHTML = `
    <button class="absolute top-2 right-3 text-xl font-bold hover:opacity-70" aria-label="Close message">&times;</button>
    ${icon}
    <h2 class="text-xl font-bold mb-2">Success!</h2>
    <p>${message}</p>
  `;

  box.querySelector("button").addEventListener("click", () => wrapper.remove());

  wrapper.appendChild(box);
  document.body.appendChild(wrapper);

  setTimeout(() => wrapper.remove(), 3000);
}
