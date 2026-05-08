import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { VENUES_URL } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),

  media: yup.object({
    url: yup.string().url("Must be a valid URL").nullable().notRequired(),
    alt: yup.string().notRequired(),
  }),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be at least 0"),

  maxGuests: yup
    .number()
    .typeError("Max guests must be a number")
    .required("Max guests is required")
    .min(1, "Must allow at least 1 guest"),

  location: yup.object({
    address: yup.string().notRequired(),
    city: yup.string().notRequired(),
    country: yup.string().notRequired(),
  }),
});

function CreateVenueForm({ onCreate }) {
  const initialState = {
    name: "",
    description: "",
    media: { url: "", alt: "" },
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

  const [meta, setMeta] = useState(initialState.meta);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialState,
  });

  function handleMetaChange(e) {
    const { name, checked } = e.target;
    setMeta((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function removeEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );
  }

  async function onSubmit(data) {
    const payload = {
      name: data.name.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      maxGuests: Number(data.maxGuests),
      meta,
    };

    if (data.media?.url?.trim()) {
      payload.media = [
        {
          url: data.media.url.trim(),
          alt: data.media.alt?.trim() || "",
        },
      ];
    }

    const cleanedLocation = removeEmpty(data.location || {});
    if (Object.keys(cleanedLocation).length > 0) {
      payload.location = cleanedLocation;
    }

    const res = await fetch(VENUES_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("API error:", result);
      return;
    }

    onCreate(result.data);
    reset();
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("Validation errors:", errors);
      })}
      noValidate
      className="custom-form"
    >
      <h3>Create new venue</h3>
      <Form.Control
        placeholder="Name*"
        {...register("name")}
        isInvalid={!!errors.name}
      />
      <Form.Control.Feedback type="invalid">
        {errors.name?.message}
      </Form.Control.Feedback>
      <Form.Control
        placeholder="Description*"
        className="mt-2"
        {...register("description")}
        isInvalid={!!errors.description}
      />
      <Form.Control.Feedback type="invalid">
        {errors.description?.message}
      </Form.Control.Feedback>
      <Form.Control
        placeholder="Image URL"
        className="mt-2"
        {...register("media.url")}
        isInvalid={!!errors.media?.url}
      />
      <Form.Control.Feedback type="invalid">
        {errors.media?.url?.message}
      </Form.Control.Feedback>
      <Form.Control
        placeholder="Image alt text"
        className="mt-2"
        {...register("media.alt")}
      />
      <Form.Control
        type="number"
        placeholder="Price*"
        className="mt-2"
        {...register("price")}
        isInvalid={!!errors.price}
      />
      <Form.Control.Feedback type="invalid">
        {errors.price?.message}
      </Form.Control.Feedback>
      <Form.Control
        type="number"
        placeholder="Max Guests*"
        className="mt-2"
        {...register("maxGuests")}
        isInvalid={!!errors.maxGuests}
      />
      <Form.Control.Feedback type="invalid">
        {errors.maxGuests?.message}
      </Form.Control.Feedback>
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
        placeholder="Address"
        className="mt-2"
        {...register("location.address")}
      />
      <Form.Control
        placeholder="City"
        className="mt-2"
        {...register("location.city")}
      />
      <Form.Control
        placeholder="Country"
        className="mt-2"
        {...register("location.country")}
      />
      <Button type="submit" className="mt-3" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create venue"}{" "}
      </Button>
    </Form>
  );
}

export default CreateVenueForm;
