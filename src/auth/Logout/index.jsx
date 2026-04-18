import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  }

  return logout;
}

export default useLogout;
