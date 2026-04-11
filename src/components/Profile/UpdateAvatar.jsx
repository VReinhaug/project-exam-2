import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { profileUrl } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";

function UpdateAvatar({ name, onUpdate }) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(profileUrl(name), {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        avatar: {
          url,
          alt,
        },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      onUpdate(data.data);
      setUrl("");
      setAlt("");
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group>
        <Form.Label>Update avatar URL</Form.Label>
        <Form.Control value={url} onChange={(e) => setUrl(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Update avatar alternative text</Form.Label>
        <Form.Control value={alt} onChange={(e) => setAlt(e.target.value)} />
      </Form.Group>

      <Button type="submit" className="mt-2">
        Update Avatar
      </Button>
    </Form>
  );
}

export default UpdateAvatar;
