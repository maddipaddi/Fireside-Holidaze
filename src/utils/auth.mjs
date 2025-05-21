/**
 * Retrieves the current user object from localStorage.
 *
 * @returns {Object|null} The parsed user object if found, otherwise null.
 */

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

/**
 * Saves the user's session data to localStorage.
 *
 * @param {Object} data - The user session data to save.
 * @param {string} data.accessToken - The access token for the user session.
 * @description
 * Stores the access token and the entire user data object in localStorage.
 * The access token is stored under the key "accessToken", and the user data
 * is stringified and stored under the key "user".
 */

export function saveUserSession(data) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data));
}

/**
 * Logs out the current user by removing user-related data from localStorage.
 * Specifically, it removes the "user" and "accessToken" items.
 */

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
}
