const BASE_URL = "https://v2.api.noroff.dev";
const HOLIDAZE_URL = `${BASE_URL}/holidaze`;

export const VENUES_URL = `${HOLIDAZE_URL}/venues`;
export const specificVenueUrl = (id) => `${HOLIDAZE_URL}/venues/${id}`;
export const bookingsUrl = (id) =>
  `${HOLIDAZE_URL}/venues/${id}?_bookings=true`;

export const profileUrl = (name) => `${HOLIDAZE_URL}/profiles/${name}`;
export const profileBookingsUrl = (name) =>
  `${HOLIDAZE_URL}/profiles/${name}/bookings`;
export const profileVenuesUrl = (name) =>
  `${HOLIDAZE_URL}/profiles/${name}/venues`;

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
