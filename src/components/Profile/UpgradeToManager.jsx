import { Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { profileUrl } from "../../api";
import { getHeaders } from "../../auth/AuthHeaders";

function UpgradeToManager({ profile, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Don't show if already venue manager
  if (profile.venueManager) return null;

  async function handleUpgrade() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(profileUrl(profile.name), {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          venueManager: true,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.errors?.[0]?.message || "Upgrade failed");
      }

      onUpdate(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <h3>Become a Venue Manager</h3>

      <p>Upgrade your account and launch your own venues.</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button onClick={handleUpgrade} disabled={loading}>
        {loading ? "Upgrading..." : "Become a Manager"}
      </Button>
    </div>
  );
}

export default UpgradeToManager;
