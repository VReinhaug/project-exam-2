import CreateVenueForm from "../CreateVenueForm";

function ManagerSection({ setVenues }) {
  function handleCreate(newVenue) {
    setVenues((prev) => [newVenue, ...prev]);
  }

  return (
    <div className="mt-5">
      <CreateVenueForm onCreate={handleCreate} />
    </div>
  );
}

export default ManagerSection;
