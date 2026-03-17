import "./venueCard.scss";
import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  const image =
    venue.media?.[0]?.url ||
    "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d4d";

  const alt = venue.media?.[0]?.alt || venue.name;

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

          <p className="venue-location">
            {venue.location?.city}, {venue.location?.country}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
