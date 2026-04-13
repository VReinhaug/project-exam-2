import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { VENUES_URL } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";

function CreateVenueForm({ onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: "",
    maxGuests: "",
    rating: 0,
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
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

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

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      media: formData.media[0].url ? formData.media : [],
    };

    const res = await fetch(VENUES_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(cleanedData),
    });

    const data = await res.json();

    if (res.ok) {
      onCreate(data.data);
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="custom-form">
      <h3>Create new venue</h3>

      <Form.Control
        name="name"
        placeholder="Name"
        required
        onChange={handleChange}
      />
      <Form.Control
        name="description"
        placeholder="Description"
        required
        className="mt-2"
        onChange={handleChange}
      />

      <Form.Control
        name="url"
        placeholder="Image URL"
        className="mt-2"
        onChange={handleMediaChange}
      />
      <Form.Control
        name="alt"
        placeholder="Image alt text"
        className="mt-2"
        onChange={handleMediaChange}
      />

      <Form.Control
        name="price"
        type="number"
        placeholder="Price"
        className="mt-2"
        onChange={handleChange}
      />
      <Form.Control
        name="maxGuests"
        type="number"
        placeholder="Max Guests"
        className="mt-2"
        onChange={handleChange}
      />

      <div className="mt-3">
        <Form.Check label="WiFi" name="wifi" onChange={handleMetaChange} />
        <Form.Check
          label="Parking"
          name="parking"
          onChange={handleMetaChange}
        />
        <Form.Check
          label="Breakfast"
          name="breakfast"
          onChange={handleMetaChange}
        />
        <Form.Check
          label="Pets allowed"
          name="pets"
          onChange={handleMetaChange}
        />
      </div>

      <Form.Control
        name="address"
        placeholder="Address"
        className="mt-2"
        onChange={handleLocationChange}
      />
      <Form.Control
        name="city"
        placeholder="City"
        className="mt-2"
        onChange={handleLocationChange}
      />
      <Form.Control
        name="country"
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
