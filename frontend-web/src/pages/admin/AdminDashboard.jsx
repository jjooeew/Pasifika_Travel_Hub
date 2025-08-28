import { Link } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;

  const cards = [
    { to: "/admin/add-country", title: "Add Country", desc: "Create a new country and upload a flag." },
    { to: "/admin/countries", title: "Manage Countries", desc: "List, edit, or delete countries." },
    { to: "/admin/posts", title: "Manage Posts", desc: "(Stub) Moderate posts." },
  ];

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="grid">
        {cards.map(c => (
          <Link className="card" key={c.to} to={c.to}>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
