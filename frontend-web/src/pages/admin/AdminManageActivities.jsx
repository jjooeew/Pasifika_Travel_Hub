import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteActivity, listAdminActivities } from "../../services/api";

export default function ManageActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listAdminActivities(slug);
      setActivities(res.data.activities);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [slug]);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;
    try {
      await deleteActivity(id);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const addActivity = (slug) =>
    navigate(`/admin/countries/${slug}/activities/new`);

  const editActivity = (id) => navigate(`/admin/activities/${id}/edit`);

  const viewActivity = (id) => navigate(`/activities/${id}`);

  return (
    <div className="container">
      <div className="header">
        <h1>Manage Activities</h1>
        <button className="btn btn--primary" onClick={() => addActivity(slug)}>
          + Add Activity
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && activities.length === 0 && (
        <p>No activities yet. Use the button above to add one.</p>
      )}
      {!loading && !error && activities.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Tags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((a) => (
              <tr key={a._id}>
                <td>
                  {a.imageUrl ? (
                    <img
                      src={a.imageUrl}
                      alt={a.title}
                      width={36}
                      height={24}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{a.title}</td>
                <td>{a.tags?.join(", ")}</td>
                <td className="actions-cell">
                  <div className="cell-actions">
                    <button
                      className="btn btn--ghost"
                      onClick={() => editActivity(a._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn--ghost"
                      onClick={() => navigate(() => viewActivity(a._id))}
                    >
                      View
                    </button>
                    <button
                      className="btn btn--danger"
                      onClick={() => onDelete(a._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
