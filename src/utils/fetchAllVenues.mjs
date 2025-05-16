import { apiRequest } from "./api.mjs";
import { VENUES } from "./constants.mjs";

export async function fetchAllVenues() {
  let currentPage = 1;
  const allVenues = [];

  while (true) {
    const result = await apiRequest(
      `${VENUES}?_bookings=true&page=${currentPage}`,
    );

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
