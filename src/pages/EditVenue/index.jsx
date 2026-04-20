import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specificVenueUrl } from "../../api";
import { updateVenue } from "../../components/Profile/EditVenue";
import { getHeaders } from "../../auth/AuthHeaders";

import { Container, Form, Button, Spinner } from "react-bootstrap";

function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: "",
    maxGuests: "",
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: "",
      lng: "",
    },
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
          media: venue.media?.length ? venue.media : [{ url: "", alt: "" }],
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

  // Handlers

  function handleChange(e) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  function handleMediaChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      media: [
        {
          ...prev.media[0],
          [name]: value,
        },
      ],
    }));
  }

  function handleMetaChange(e) {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [name]: checked,
      },
    }));
  }

  function handleLocationChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  }

  function removeEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );
  }

  // Submit the updates
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests),
        meta: formData.meta,
      };

      if (formData.media[0].url.trim()) {
        payload.media = [
          {
            url: formData.media[0].url.trim(),
            alt: formData.media[0].alt.trim() || "",
          },
        ];
      }

      const cleanedLocation = removeEmpty({
        ...formData.location,
        lat:
          formData.location.lat !== ""
            ? Number(formData.location.lat)
            : undefined,
        lng:
          formData.location.lng !== ""
            ? Number(formData.location.lng)
            : undefined,
      });

      if (Object.keys(cleanedLocation).length > 0) {
        payload.location = cleanedLocation;
      }

      await updateVenue(id, payload);

      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to update venue");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Spinner />;

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit} className="custom-form">
        <h3>Edit venue</h3>

        <Form.Group className="mt-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="url"
            value={formData.media?.[0]?.url || ""}
            onChange={handleMediaChange}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Image alt text</Form.Label>
          <Form.Control
            name="alt"
            value={formData.media?.[0]?.alt || ""}
            onChange={handleMediaChange}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Max Guests</Form.Label>
          <Form.Control
            type="number"
            name="maxGuests"
            value={formData.maxGuests}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mt-3">
          <Form.Check
            label="WiFi"
            name="wifi"
            checked={formData.meta.wifi}
            onChange={handleMetaChange}
          />
          <Form.Check
            label="Parking"
            name="parking"
            checked={formData.meta.parking}
            onChange={handleMetaChange}
          />
          <Form.Check
            label="Breakfast"
            name="breakfast"
            checked={formData.meta.breakfast}
            onChange={handleMetaChange}
          />
          <Form.Check
            label="Pets allowed"
            name="pets"
            checked={formData.meta.pets}
            onChange={handleMetaChange}
          />
        </div>

        <Form.Group className="mt-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            value={formData.location.address}
            onChange={handleLocationChange}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={formData.location.city}
            onChange={handleLocationChange}
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            name="country"
            value={formData.location.country}
            onChange={handleLocationChange}
          />
        </Form.Group>

        <Button type="submit" className="mt-3">
          Update venue
        </Button>
      </Form>
    </Container>
  );
}

export default EditVenue;
