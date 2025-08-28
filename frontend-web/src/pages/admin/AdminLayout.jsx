import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css"


export default function AdminLayout() {
  return (
    <div className="admin-wrap">
      <aside className="admin-aside">
        {/* <h2>Admin Menu</h2> */}
        <nav className="stack">
          <NavLink to="/admin/admin-dashboard">Dashboard</NavLink>
          <NavLink to="/admin/add-country">Add Country</NavLink>
          <NavLink to="/admin/countries">Manage Countries</NavLink>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
