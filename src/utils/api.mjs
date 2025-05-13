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

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      let errorMessage = "An unknown error occurred";
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage =
          errorData.errors?.[0]?.message || errorData.message || errorMessage;
      } else {
        errorMessage = await response.text();
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error) {
    throw error;
  }
}
