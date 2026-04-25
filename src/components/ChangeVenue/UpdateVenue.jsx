import { getHeaders } from "../../auth/AuthHeaders";
import { specificVenueUrl } from "../../api";

export async function updateVenue(id, data) {
  const response = await fetch(specificVenueUrl(id), {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to update venue");

  const json = await response.json();
  return json.data;
}
