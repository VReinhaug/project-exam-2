export function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "X-Noroff-API-Key": process.env.REACT_APP_API_KEY,
  };
}
