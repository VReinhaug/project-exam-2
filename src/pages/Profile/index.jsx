import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { profileUrl, profileBookingsUrl, profileVenuesUrl } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";
import UpgradeToManager from "../../components/Profile/UpgradeToManager";
import UpdateAvatar from "../../components/Profile/UpdateAvatar";
import ManagerSection from "../../components/Profile/ManagerSection";
import MyBookings from "../../components/MyBookings";
import "./profile.scss";
import "../../styles/_forms.scss";

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

        // Fetch venues (if manager)
        if (profileJson.data.venueManager) {
          const venuesRes = await fetch(
            `${profileVenuesUrl(name)}?_bookings=true`,
            { headers }
          );
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
          <UpdateAvatar name={profile.name} onUpdate={setProfile} />
          <h1>{profile.name}</h1>
          <p>{profile.bio}</p>
        </div>
      </div>

      <MyBookings bookings={bookings} />

      <UpgradeToManager profile={profile} onUpdate={setProfile} />

      {profile.venueManager && (
        <section className="mt-5">
          {profile.venueManager && (
            <ManagerSection venues={venues} setVenues={setVenues} />
          )}
        </section>
      )}
    </Container>
  );
}

export default Profile;
