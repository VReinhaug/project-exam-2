import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { VENUES_URL } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";

function CreateVenueForm({ onCreate }) {
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

  async function handleSubmit(e) {
    e.preventDefault();

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

    const res = await fetch(VENUES_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API error:", data);
      return;
    }

    onCreate(data.data);

    setFormData(initialState);
  }

  return (
    <Form onSubmit={handleSubmit} className="custom-form">
      <h3>Create new venue</h3>

      <Form.Control
        name="name"
        value={formData.name}
        placeholder="Name"
        required
        onChange={handleChange}
      />

      <Form.Control
        name="description"
        value={formData.description}
        placeholder="Description"
        required
        className="mt-2"
        onChange={handleChange}
      />

      <Form.Control
        name="url"
        value={formData.media[0].url}
        placeholder="Image URL"
        className="mt-2"
        onChange={handleMediaChange}
      />

      <Form.Control
        name="alt"
        value={formData.media[0].alt}
        placeholder="Image alt text"
        className="mt-2"
        onChange={handleMediaChange}
      />

      <Form.Control
        name="price"
        value={formData.price}
        type="number"
        placeholder="Price"
        required
        className="mt-2"
        onChange={handleChange}
      />

      <Form.Control
        name="maxGuests"
        value={formData.maxGuests}
        type="number"
        placeholder="Max Guests"
        required
        className="mt-2"
        onChange={handleChange}
      />

      <div className="mt-3">
        <Form.Check label="WiFi" name="wifi" onChange={handleMetaChange} />
        <Form.Check
          label="Parking"
          name="parking"
          value={formData.meta.parking}
          onChange={handleMetaChange}
        />
        <Form.Check
          label="Breakfast"
          name="breakfast"
          value={formData.meta.breakfast}
          onChange={handleMetaChange}
        />
        <Form.Check
          label="Pets allowed"
          name="pets"
          value={formData.meta.pets}
          onChange={handleMetaChange}
        />
      </div>

      <Form.Control
        name="address"
        value={formData.location.address}
        placeholder="Address"
        className="mt-2"
        onChange={handleLocationChange}
      />

      <Form.Control
        name="city"
        value={formData.location.city}
        placeholder="City"
        className="mt-2"
        onChange={handleLocationChange}
      />

      <Form.Control
        name="country"
        value={formData.location.country}
        placeholder="Country"
        className="mt-2"
        onChange={handleLocationChange}
      />

      <Button type="submit" className="mt-3">
        Create venue
      </Button>
    </Form>
  );
}

export default CreateVenueForm;
