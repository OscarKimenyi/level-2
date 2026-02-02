export default function LogoutButton() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <button className="btn btn-danger" onClick={logout}>
      Logout
    </button>
  );
}
