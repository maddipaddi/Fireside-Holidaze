import { useState } from "react";
import { apiRequest } from "../utils/api.mjs";

/**
 * Custom React hook for handling API requests with loading state management.
 *
 * @returns {{
 *   request: (url: string, options?: RequestInit) => Promise<any>,
 *   isLoading: boolean
 * }} An object containing the `request` function to perform API calls and an `isLoading` boolean indicating the loading state.
 */

export function useApiRequest() {
  const [isLoading, setIsLoading] = useState(false);

  async function request(url, options) {
    setIsLoading(true);
    try {
      return await apiRequest(url, options);
    } finally {
      setIsLoading(false);
    }
  }

  return { request, isLoading };
}
