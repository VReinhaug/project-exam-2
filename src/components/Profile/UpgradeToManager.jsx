export default function UpgradeToManager({ isManager }) {
  if (isManager) return null;

  return (
    <div className="mt-4">
      <p>You are not a venue manager.</p>
      <p>
        If you want to manage venues, please register a new account as a venue
        manager.
      </p>
    </div>
  );
}
