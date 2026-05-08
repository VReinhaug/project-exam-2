import { Link } from "react-router-dom";
import "./pageNotFound.scss";

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404 – Page not found</h1>
      <p>Unfortunately, the page you are looking for does not exist.</p>

      <Link to="/" className="btn mt-3">
        Go to home page
      </Link>
    </div>
  );
}

export default NotFound;
