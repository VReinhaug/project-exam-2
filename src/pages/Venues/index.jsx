import { useEffect, useState } from "react";
import { VENUES_URL } from "../../api";

import VenueCard from "../../components/VenueCard/index";
import SearchBar from "../../components/SearchBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./venues.scss";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    fetchVenues(page);
  }, [page]);

  async function fetchVenues(pageNumber) {
    setLoading(true);

    try {
      const response = await fetch(`${VENUES_URL}?limit=12&page=${pageNumber}`);
      const json = await response.json();

      setVenues((prev) => [...prev, ...json.data]);

      setIsLastPage(json.meta.isLastPage);
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  return (
    <Container className="venues-page">
      <h1 className="venues-title">Where would you like to go?</h1>
      <div className="venues-search">
        <SearchBar />
      </div>

      <Row>
        {venues.map((venue) => (
          <Col key={venue.id} md={6} lg={4} className="mb-4">
            <VenueCard venue={venue} />
          </Col>
        ))}
      </Row>

      {!isLastPage && (
        <div className="text-center my-4">
          <button onClick={loadMore} disabled={loading} className="btn">
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </Container>
  );
}

export default Venues;
