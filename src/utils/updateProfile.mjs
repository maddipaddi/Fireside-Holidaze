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
      console.warn("Response status:", response.status, response.statusText);
      throw new Error("Failed to update avatar");
    }

    const result = await response.json();
    console.log("User updated:", result);
    return result.data;
  } catch (error) {
    console.error("Error while updating avatar:", error);
    throw error;
  }
}
