import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { getHeaders } from "../../auth/AuthHeaders";
import { specificVenueUrl } from "../../api";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),

  media: yup.object({
    url: yup
      .string()
      .transform((v) => (v === "" ? undefined : v))
      .url("Must be a valid URL")
      .notRequired(),
    alt: yup.string().notRequired(),
  }),

  price: yup
    .number()
    .transform((v, o) => (o === "" ? undefined : v))
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0),

  maxGuests: yup
    .number()
    .transform((v, o) => (o === "" ? undefined : v))
    .typeError("Max guests must be a number")
    .required("Max guests is required")
    .min(1),

  location: yup.object({
    address: yup.string().notRequired(),
    city: yup.string().notRequired(),
    country: yup.string().notRequired(),
  }),
});

function UpdateVenue({ id, defaultValues, onSuccess }) {
  const [meta, setMeta] = useState(defaultValues.meta);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  function handleMetaChange(e) {
    const { name, checked } = e.target;
    setMeta((prev) => ({ ...prev, [name]: checked }));
  }

  function removeEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, v]) => v !== "" && v !== null && v !== undefined
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

    const res = await fetch(specificVenueUrl(id), {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to update venue");

    const json = await res.json();
    onSuccess(json.data);
    reset(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate className="custom-form">
      <h3>Edit venue</h3>

      <Form.Control
        {...register("name")}
        isInvalid={!!errors.name}
        placeholder="Name"
      />
      <Form.Control.Feedback type="invalid">
        {errors.name?.message}
      </Form.Control.Feedback>

      <Form.Control
        className="mt-2"
        {...register("description")}
        isInvalid={!!errors.description}
        placeholder="Description"
      />
      <Form.Control.Feedback type="invalid">
        {errors.description?.message}
      </Form.Control.Feedback>

      <Form.Control
        className="mt-2"
        {...register("media.url")}
        isInvalid={!!errors.media?.url}
        placeholder="Image URL"
      />
      <Form.Control.Feedback type="invalid">
        {errors.media?.url?.message}
      </Form.Control.Feedback>

      <Form.Control
        className="mt-2"
        {...register("media.alt")}
        placeholder="Image alt text"
      />

      <Form.Control
        type="number"
        className="mt-2"
        {...register("price")}
        isInvalid={!!errors.price}
        placeholder="Price"
      />
      <Form.Control.Feedback type="invalid">
        {errors.price?.message}
      </Form.Control.Feedback>

      <Form.Control
        type="number"
        className="mt-2"
        {...register("maxGuests")}
        isInvalid={!!errors.maxGuests}
        placeholder="Max Guests"
      />
      <Form.Control.Feedback type="invalid">
        {errors.maxGuests?.message}
      </Form.Control.Feedback>

      <div className="mt-3">
        <Form.Check
          label="WiFi"
          name="wifi"
          onChange={handleMetaChange}
          defaultChecked={meta.wifi}
        />
        <Form.Check
          label="Parking"
          name="parking"
          onChange={handleMetaChange}
          defaultChecked={meta.parking}
        />
        <Form.Check
          label="Breakfast"
          name="breakfast"
          onChange={handleMetaChange}
          defaultChecked={meta.breakfast}
        />
        <Form.Check
          label="Pets"
          name="pets"
          onChange={handleMetaChange}
          defaultChecked={meta.pets}
        />
      </div>

      <Form.Control
        className="mt-2"
        {...register("location.address")}
        placeholder="Address"
      />
      <Form.Control
        className="mt-2"
        {...register("location.city")}
        placeholder="City"
      />
      <Form.Control
        className="mt-2"
        {...register("location.country")}
        placeholder="Country"
      />

      <Button type="submit" className="mt-3" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Update venue"}
      </Button>
    </Form>
  );
}

export default UpdateVenue;
