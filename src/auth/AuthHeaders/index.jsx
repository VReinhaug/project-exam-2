export function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
  };
}
