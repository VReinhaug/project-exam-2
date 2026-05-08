import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { profileUrl } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

// Validation schema
const schema = yup.object({
  url: yup
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .url("Must be a valid URL")
    .notRequired(),

  alt: yup
    .string()
    .transform((v) => (v === "" ? "" : v))
    .max(120, "Alt text must be less than 120 characters")
    .when("url", {
      is: (url) => !!url,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) =>
        schema.test(
          "alt-without-url",
          "You must set an image URL before adding alt text",
          (value) => !value || value === ""
        ),
    }),
});

function UpdateAvatar({ name, onUpdate }) {
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      url: "",
      alt: "",
    },
  });

  async function onSubmit(data) {
    const res = await fetch(profileUrl(name), {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        avatar: {
          url: data.url || "",
          alt: data.alt || "",
        },
      }),
    });

    const result = await res.json();

    if (res.ok) {
      onUpdate(result.data);
      reset();
      setShowForm(false);
    }
  }

  return (
    <div className="avatar-edit mt-2">
      {!showForm ? (
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="icon"
          onClick={() => setShowForm(true)}
          style={{ cursor: "pointer" }}
          title="Edit avatar"
        />
      ) : (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-4 custom-form"
        >
          <Form.Group>
            <Form.Label>Update avatar URL</Form.Label>
            <Form.Control {...register("url")} isInvalid={!!errors.url} />
            <Form.Control.Feedback type="invalid">
              {errors.url?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Update avatar alternative text</Form.Label>
            <Form.Control {...register("alt")} isInvalid={!!errors.alt} />
            <Form.Control.Feedback type="invalid">
              {errors.alt?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="mt-2" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Avatar"}{" "}
          </Button>
        </Form>
      )}
    </div>
  );
}

export default UpdateAvatar;
