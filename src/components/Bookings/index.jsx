import { CREATE_BOOKING_URL } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";

export async function createBooking({ dateFrom, dateTo, guests, venueId }) {
  const headers = getHeaders();

  const response = await fetch(CREATE_BOOKING_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      dateFrom,
      dateTo,
      guests,
      venueId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  const json = await response.json();
  return json.data;
}
