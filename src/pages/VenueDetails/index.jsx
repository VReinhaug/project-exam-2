import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { specificVenueUrl } from "../../api";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./venueDetails.scss";
import "../../styles/_buttons.scss";

function VenueDetails() {
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch(specificVenueUrl(id));
        const json = await response.json();

        setVenue(json.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!venue) return <p>Venue not found</p>;

  const image =
    venue.media?.[0]?.url ||
    "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d4d";

  return (
    <Container className="venue-details">
      <h1>{venue.name}</h1>
      <p className="rating">
        ⭐ {venue.rating ? venue.rating.toFixed(1) : "No rating"}
      </p>

      <p className="location">
        {venue.location?.city}, {venue.location?.country}
      </p>

      <div className="image-gallery">
        <img
          className="main-image"
          src={venue.media?.[0]?.url}
          alt={venue.name}
        />

        <div className="thumbnail-row">
          {venue.media?.slice(1, 5).map((img, index) => (
            <img key={index} src={img.url} alt={img.alt} />
          ))}
        </div>
      </div>

      <Row className="mt-4">
        <Col md={8}>
          <h3>Description</h3>
          <p>{venue.description}</p>

          <h4>Amenities</h4>

          <ul className="amenities">
            {venue.meta?.wifi && <li>WiFi</li>}
            {venue.meta?.parking && <li>Parking</li>}
            {venue.meta?.breakfast && <li>Breakfast</li>}
            {venue.meta?.pets && <li>Pets allowed</li>}
          </ul>
        </Col>

        <Col md={4}>
          <div className="booking-card">
            <p className="price">${venue.price} / night</p>

            <p>Max guests: {venue.maxGuests}</p>

            <div className="calendar">
              <p>Calendar placeholder</p>
            </div>

            <button className="btn" disabled>
              Login to book
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default VenueDetails;
