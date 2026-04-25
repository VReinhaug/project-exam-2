import { getHeaders } from "../../auth/AuthHeaders";
import { specificVenueUrl } from "../../api";

export async function deleteVenue(id) {
  const response = await fetch(specificVenueUrl(id), {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) throw new Error("Failed to delete venue");

  return true;
}
