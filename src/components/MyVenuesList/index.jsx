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
        <Link to={`/venues/${venue.id}`}>
          <Card className="mb-3 venue-card">
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
          </Card>
        </Link>
      </Col>
    );
  });
}

export default MyVenuesList;
