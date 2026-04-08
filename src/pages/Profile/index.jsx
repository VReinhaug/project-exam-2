import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { profileUrl, profileBookingsUrl, profileVenuesUrl } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";
import UpgradeToManager from "../../components/Profile/UpgradeToManager";
import "./profile.scss";

function Profile() {
  const { name } = useParams();

  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = getHeaders();

        // Fetch profile
        const profileRes = await fetch(profileUrl(name), { headers });
        const profileJson = await profileRes.json();

        setProfile(profileJson.data);

        // Fetch bookings
        const bookingsRes = await fetch(profileBookingsUrl(name), {
          headers,
        });
        const bookingsJson = await bookingsRes.json();
        setBookings(bookingsJson.data);

        // Fetch venues (only if manager)
        if (profileJson.data.venueManager) {
          const venuesRes = await fetch(profileVenuesUrl(name), {
            headers,
          });
          const venuesJson = await venuesRes.json();
          setVenues(venuesJson.data);
        }
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [name]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );
  }

  if (!profile) return <p>No profile found</p>;

  return (
    <Container className="profile-page">
      <div className="profile-header">
        {profile.banner?.url && (
          <img
            src={profile.banner.url}
            alt={profile.banner.alt}
            className="banner"
          />
        )}

        <div className="profile-info">
          {profile.avatar?.url && (
            <img
              src={profile.avatar.url}
              alt={profile.avatar.alt}
              className="avatar"
            />
          )}
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
        </div>
      </div>

      <section className="mt-5">
        <h2>My Bookings</h2>
        <Row>
          {bookings.map((booking) => (
            <Col key={booking.id} md={6} lg={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Booking</Card.Title>
                  <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p>Guests: {booking.guests}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <UpgradeToManager isManager={profile.venueManager} />

      {profile.venueManager && (
        <section className="mt-5">
          <h2>My Venues</h2>
          <Row>
            {venues.map((venue) => (
              <Col key={venue.id} md={6} lg={4}>
                <Card className="mb-3">
                  {venue.media?.[0]?.url && (
                    <Card.Img src={venue.media[0].url} />
                  )}
                  <Card.Body>
                    <Card.Title>{venue.name}</Card.Title>
                    <p>{venue.price} NOK / night</p>
                    <p>Max guests: {venue.maxGuests}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
}

export default Profile;
