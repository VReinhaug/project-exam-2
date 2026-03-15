import { useEffect, useState } from "react";
import { VENUES_URL } from "../../api";

import VenueCard from "../../components/VenueCard/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./venues.scss";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(VENUES_URL);
        const json = await response.json();

        setVenues(json.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  if (loading) return <p>Loading venues...</p>;

  return (
    <Container className="venues-page">
      <h1 className="venues-title">Where would you like to go?</h1>

      <Row>
        {venues.map((venue) => (
          <Col key={venue.id} md={6} lg={4} className="mb-4">
            <VenueCard venue={venue} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Venues;
