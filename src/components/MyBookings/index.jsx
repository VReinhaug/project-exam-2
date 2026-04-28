import { useState, useMemo } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyBookings({ bookings }) {
  const [showPast, setShowPast] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { upcoming, past } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = [];
    const past = [];

    bookings.forEach((booking) => {
      const endDate = new Date(booking.dateTo);

      if (endDate >= today) {
        upcoming.push(booking);
      } else {
        past.push(booking);
      }
    });

    return { upcoming, past };
  }, [bookings]);

  const bookingsToShow = showPast ? past : upcoming;

  return (
    <section className="mt-5">
      <h2>My Bookings</h2>

      {bookingsToShow.length === 0 ? (
        <p>
          {showPast
            ? "You have no previous stays"
            : "You have no upcoming bookings"}
        </p>
      ) : (
        <Row>
          {bookingsToShow.map((booking) => (
            <Col key={booking.id} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{booking.venue?.name || "Venue"}</Card.Title>
                  <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p>Guests: {booking.guests}</p>
                  {booking.venue?.id && (
                    <Link to={`/venues/${booking.venue.id}`} className="btn">
                      View venue
                    </Link>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="mt-3">
        <Button
          variant="outline-secondary"
          onClick={() => setShowPast((prev) => !prev)}
        >
          {showPast ? "View upcoming bookings" : "View your previous stays"}
        </Button>
      </div>
    </section>
  );
}

export default MyBookings;
