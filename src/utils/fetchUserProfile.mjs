import { PROFILE } from "./constants.mjs";

export async function fetchUserProfile(name, token) {
  const url = `${PROFILE}/${name}?_=${Date.now()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Kunne ikke hente Holidaze-profil");
  }

  const result = await response.json();
  return result.data;
}
