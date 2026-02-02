export default function Profile() {
  const role = localStorage.getItem("role");

  return (
    <div className="container-fluid p-4">
      <h3>My Profile</h3>
      <p>
        <b>Role:</b> {role}
      </p>
    </div>
  );
}
