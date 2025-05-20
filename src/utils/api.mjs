/**
 * Makes an API request with default headers and error handling.
 *
 * @async
 * @param {string} url - The endpoint URL to send the request to.
 * @param {Object} [options={}] - Additional fetch options (e.g., method, headers, body).
 * @param {string} [options.method] - HTTP method (GET, POST, etc.).
 * @param {Object} [options.headers] - Additional headers to include in the request.
 * @param {any} [options.body] - Request body for POST/PUT requests.
 * @returns {Promise<any|null>} The parsed JSON response, or null if the response is not JSON.
 * @throws {Error} Throws an error if the response is not ok, with a message from the API if available.
 */

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
