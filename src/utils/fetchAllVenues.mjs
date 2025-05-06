import { apiRequest } from "./api.mjs";
import { ALL_USERS } from "./constants.mjs";

export async function fetchAllVenues() {
  let currentPage = 1;
  const allVenues = [];

  while (true) {
    const result = await apiRequest(`${ALL_USERS}?page=${currentPage}`);

    if (result?.data?.length) {
      allVenues.push(...result.data);

      if (result.meta.isLastPage) break;
      currentPage++;
    } else {
      break;
    }
  }

  return allVenues;
}
