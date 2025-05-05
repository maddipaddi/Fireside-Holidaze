export async function apiRequest(url, options = {}) {
  const token = localStorage.getItem("accessToken");

  const defaultHeaders = {
    "Content-type": "application/json",
    "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const finalHeaders = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, finalHeaders);

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "An unknown error occurred, try again later";
      if (errorData.errors && errorData.errors[0]?.message) {
        errorMessage = errorData.errors[0].message;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
