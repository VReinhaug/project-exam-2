import { useEffect, useState } from "react";
import { VENUES_URL } from "../../api";

import VenueCard from "../../components/VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";

import "./home.scss";
import bannerImage from "../../assets/banner.jpg";

function Home() {
  const [venues, setVenues] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(VENUES_URL);
        const json = await response.json();

        // Get last updated venues
        const sorted = json.data.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );

        setVenues(sorted);
        setFiltered(sorted.slice(0, 3));
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  return (
    <div className="home-page">
      {}
      <div className="hero">
        <img src={bannerImage} alt="Travel banner" />

        <div className="hero-overlay">
          <h1>Find your next adventure</h1>
        </div>
      </div>

      {}
      <Container className="home-content">
        <h2>Recently updated venues</h2>

        <Row>
          {filtered.slice(0, 3).map((venue) => (
            <Col key={venue.id} md={6} lg={4} className="mb-4">
              <VenueCard venue={venue} />
            </Col>
          ))}
        </Row>

        <Link to="/venues">
          <button className="btn mt-3">See all venues</button>
        </Link>
      </Container>
    </div>
  );
}

export default Home;
