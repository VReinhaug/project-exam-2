import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specificVenueUrl } from "../../api";
import UpdateVenue from "../../components/ChangeVenue/UpdateVenue";
import { getHeaders } from "../../auth/AuthHeaders";

import { Container, Spinner } from "react-bootstrap";

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch and prefill form
  useEffect(() => {
    async function fetchVenue() {
      try {
        const res = await fetch(specificVenueUrl(id), {
          headers: getHeaders(),
        });
        const json = await res.json();

        const venue = json.data;

        setFormData({
          name: venue.name || "",
          description: venue.description || "",
          media: venue.media?.[0] || { url: "", alt: "" },
          price: venue.price || "",
          maxGuests: venue.maxGuests || "",
          meta: {
            wifi: venue.meta?.wifi || false,
            parking: venue.meta?.parking || false,
            breakfast: venue.meta?.breakfast || false,
            pets: venue.meta?.pets || false,
          },
          location: {
            address: venue.location?.address || "",
            city: venue.location?.city || "",
            zip: venue.location?.zip || "",
            country: venue.location?.country || "",
            continent: venue.location?.continent || "",
            lat: venue.location?.lat || "",
            lng: venue.location?.lng || "",
          },
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <Container className="mt-5">
      <UpdateVenue
        id={id}
        defaultValues={formData}
        onSuccess={() => navigate(-1)}
      />
    </Container>
  );
}

export default EditVenue;
