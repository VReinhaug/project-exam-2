import { useEffect, useState } from "react";
import { VENUES_URL } from "../../api";

import VenueCard from "../../components/VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

import "./home.scss";
import bannerImage from "../../assets/banner.jpg";
import SearchBar from "../../components/SearchBar";

function Home() {
  const [recentVenues, setRecentVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentVenues() {
      try {
        const response = await fetch(`${VENUES_URL}?sort=updated&limit=3`);
        const json = await response.json();

        setRecentVenues(json.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentVenues();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="home-page">
      {}
      <div className="hero">
        <img src={bannerImage} alt="Boats in Cambodia" />

        <div className="hero-overlay">
          <h1>Find your next adventure</h1>
          <SearchBar />
        </div>
      </div>

      {}
      <Container className="home-content">
        <h2>Recently updated venues</h2>
        <Row>
          {recentVenues.map((venue) => (
            <Col key={venue.id} md={6} lg={4} className="mb-4">
              <VenueCard venue={venue} />
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center mt-3">
          <Link to="/venues" className="btn">
            See all venues
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;
