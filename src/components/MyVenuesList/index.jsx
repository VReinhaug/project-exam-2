import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

function MyVenuesList({ venues = [] }) {
  if (!venues || venues.length === 0) {
    return <p>You have no venues yet, create one below!</p>;
  }

  return venues.map((venue) => {
    const image = venue.media?.[0]?.url;
    const alt = venue.media?.[0]?.alt;

    return (
      <Col key={venue.id} md={6} lg={4}>
        <Card className="mb-3 venue-card">
          <Link to={`/venues/${venue.id}`}>
            <div className="venue-image-wrapper">
              {image && <Card.Img variant="top" src={image} alt={alt} />}

              <div className="price-badge">${venue.price}</div>
            </div>
            <Card.Body>
              <Card.Title>{venue.name}</Card.Title>
              <p className="venue-location">
                {venue.location?.city}, {venue.location?.country}
              </p>
            </Card.Body>
          </Link>
          <Card.Body className="pt-0">
            <h6>Bookings:</h6>

            {venue.bookings && venue.bookings.length > 0 ? (
              venue.bookings.map((booking) => (
                <div key={booking.id} className="small mb-2">
                  <div>
                    {new Date(booking.dateFrom).toLocaleDateString()} →{" "}
                    {new Date(booking.dateTo).toLocaleDateString()}
                  </div>
                  <div>Guests: {booking.guests}</div>
                </div>
              ))
            ) : (
              <p className="small">No bookings yet</p>
            )}
          </Card.Body>
        </Card>
      </Col>
    );
  });
}

export default MyVenuesList;
