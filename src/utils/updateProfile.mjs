import { apiRequest } from "./api.mjs";
import { PROFILE } from "./constants.mjs";

/**
 * Updates the profile information for a given user.
 *
 * @param {string} username - The username of the profile to update.
 * @param {Object} data - The profile data to update.
 * @returns {Promise<any>} A promise that resolves with the response from the API request.
 */

export async function updateProfile(username, data) {
  const url = `${PROFILE}/${username}`;
  return await apiRequest(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
