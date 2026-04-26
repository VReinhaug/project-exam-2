import "./venueCard.scss";
import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  const image = venue.media?.[0]?.url;
  const alt = venue.media?.[0]?.alt;

  const location = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Link to={`/venues/${venue.id}`} className="venue-card">
      <div className="venue-card">
        <div className="venue-image-wrapper">
          <img src={image} alt={alt} />

          <div className="price-badge">${venue.price}</div>

          {venue.rating > 0 && (
            <div className="rating-badge">⭐ {venue.rating}</div>
          )}
        </div>

        <div className="venue-content">
          <h3>{venue.name}</h3>
          <p className="venue-location">{location || "\u00A0"}</p>{" "}
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
