import { apiRequest } from "./api.mjs";
import { PROFILE } from "./constants.mjs";

export async function updateProfile(username, data) {
  const url = `${PROFILE}/${username}`;
  return await apiRequest(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
