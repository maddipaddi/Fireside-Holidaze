import { PROFILE } from "./constants.mjs";

export async function updateAvatar(name, imageUrl, altText, token) {
  const url = `${PROFILE}/${name}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
  };

  const body = {
    avatar: {
      url: imageUrl,
      alt: altText,
    },
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.warn("❌ Responsstatus:", response.status, response.statusText);
      throw new Error("Kunne ikke oppdatere avatar");
    }

    const result = await response.json();
    console.log("✅ Oppdatert bruker:", result);
    return result.data;
  } catch (error) {
    console.error("💥 Feil under oppdatering av avatar:", error);
    throw error;
  }
}
