import { apiRequest } from "./api.mjs";
import { VENUES } from "./constants.mjs";

/**
 * Fetches all venues from the API, handling pagination automatically.
 *
 * Iteratively requests venue data from the API, aggregating results from all pages
 * until the last page is reached. Returns an array containing all venue objects.
 *
 * @async
 * @function fetchAllVenues
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of all venue objects.
 */

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
