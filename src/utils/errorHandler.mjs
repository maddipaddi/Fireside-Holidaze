/**
 * Displays a styled popup error message on the page and logs the error to the console.
 * Removes any existing error popup before showing a new one.
 * The popup automatically disappears after 4 seconds or can be closed manually.
 *
 * @param {Error|string} error - The error object or message to display.
 */

export function handleError(error) {
  const existing = document.getElementById("popup-error");
  if (existing) existing.remove();

  const wrapper = document.createElement("div");
  wrapper.id = "popup-error";
  wrapper.className =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50";

  const box = document.createElement("div");
  box.className =
    "relative rounded-2xl shadow-xl p-6 max-w-sm text-center bg-copy text-background dark:bg-background dark:text-copy border border-primary dark:border-secondary";

  const icon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626"" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  `;

  const title = error?.title || "Something went wrong";
  const message = error?.message || "An unexpected error occurred.";

  box.innerHTML = `
    <button class="absolute top-2 right-3 text-xl font-bold hover:opacity-70" aria-label="Close message">&times;</button>
    ${icon}
    <h2 class="text-xl font-bold mb-2">${title}</h2>
    <p>${message}</p>
  `;

  box.querySelector("button").addEventListener("click", () => wrapper.remove());

  wrapper.appendChild(box);
  document.body.appendChild(wrapper);

  setTimeout(() => wrapper.remove(), 4000);
}
