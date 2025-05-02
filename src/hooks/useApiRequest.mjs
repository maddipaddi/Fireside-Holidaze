import { useState } from "react";
import { apiRequest } from "../utils/api.mjs";

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
