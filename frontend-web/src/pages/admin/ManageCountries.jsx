import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountries, deleteCountry } from "../../services/api";
import "./ManageCountries.css";

export default function ManageCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getCountries();
      setCountries(res.data?.countries || res.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (slug) => {
    if (!window.confirm("Delete this country?")) return;
    try {
      await deleteCountry(slug);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const addActivity = (slug) =>
    navigate(`/admin/countries/${slug}/activities/new`);

  return (
    <div className="container">
      <div className="header">
        <h1>Manage Countries</h1>
        <button
          className="btn btn--primary"
          onClick={() => navigate("/admin/add-country")}
        >
          + Add Country
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c._id}>
              <td>
                {c.flagUrl ? (
                  <img
                    src={c.flagUrl}
                    alt={c.countryName}
                    width={36}
                    height={24}
                  />
                ) : (
                  "—"
                )}
              </td>
              <td>{c.countryName}</td>
              <td>{c.slug}</td>
              <td className="actions-cell">
                <div className="cell-actions">
                  <button
                    className="btn btn--ghost"
                    onClick={() => navigate(`/admin/countries/${c.slug}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => addActivity(c.slug)}
                  >
                    + Activity
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/countries/${c.slug}/activities`)
                    }
                  >
                    Manage Activities
                  </button>
                  <button
                    className="btn btn--ghost"
                    onClick={() =>
                      navigate(`/countries/${c.slug}/things-to-do`)
                    }
                  >
                    View
                  </button>
                  <button
                    className="btn btn--danger"
                    onClick={() => onDelete(c.slug)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
