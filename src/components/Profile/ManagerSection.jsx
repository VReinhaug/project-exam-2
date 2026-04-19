import { Row } from "react-bootstrap";
import CreateVenueForm from "../CreateVenueForm";
import MyVenuesList from "../MyVenuesList";

function ManagerSection({ venues, setVenues }) {
  function handleCreate(newVenue) {
    setVenues((prev) => [newVenue, ...prev]);
  }

  return (
    <div className="mt-5">
      <h2 className="mt-4">My Venues</h2>
      <Row>
        <MyVenuesList venues={venues} setVenues={setVenues} />
      </Row>
      <CreateVenueForm onCreate={handleCreate} />
    </div>
  );
}

export default ManagerSection;
