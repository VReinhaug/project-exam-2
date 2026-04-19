import { Link } from "react-router-dom";
import { Card, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { deleteVenue } from "../Profile/EditVenue";

function MyVenuesList({ venues = [], setVenues }) {
  const [openVenueId, setOpenVenueId] = useState(null);

  if (!venues || venues.length === 0) {
    return <p>You have no venues yet, create one below!</p>;
  }

  function toggleBookings(venueId) {
    setOpenVenueId((prev) => (prev === venueId ? null : venueId));
  }

  // Delete venue
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmDelete) return;

    try {
      await deleteVenue(id);

      // Remove venue
      setVenues((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete venue");
    }
  }

  return venues.map((venue) => {
    const image = venue.media?.[0]?.url;
    const alt = venue.media?.[0]?.alt;
    const isOpen = openVenueId === venue.id;
    const bookings = venue.bookings || [];
    const sortedBookings = [...bookings].sort(
      (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
    );

    return (
      <Col key={venue.id} md={6} lg={4}>
        <Card className="mb-3 venue-card position-relative">
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              gap: "10px",
              zIndex: 10,
            }}
          >
            <Button size="sm">Edit</Button>

            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDelete(venue.id)}
            >
              Delete
            </Button>
          </div>

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
            <Button size="sm" onClick={() => toggleBookings(venue.id)}>
              {isOpen ? "Hide bookings" : `Show bookings (${bookings.length})`}
            </Button>
          </Card.Body>
          {isOpen && (
            <Card.Body className="pt-0">
              <h6>Bookings:</h6>

              {sortedBookings.length > 0 ? (
                sortedBookings.map((booking) => (
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
          )}
        </Card>
      </Col>
    );
  });
}

export default MyVenuesList;
