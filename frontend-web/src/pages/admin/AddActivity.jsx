// frontend-web/src/pages/admin/AdminAddActivity.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createActivity } from "../../services/api";

export default function AdminAddActivity() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", imageUrl: "" });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true); setErr("");
    try {
      await createActivity(slug, form);
      navigate(`/countries/${slug}/things-to-do`);
    } catch (e) {
      setErr(e?.response?.data?.msg || "Failed to create activity");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Activity ({slug})</h1>
      {err && <div className="mb-3 text-red-600">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={onChange}
                 className="w-full border rounded p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={onChange}
                    className="w-full border rounded p-2" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={onChange}
                 className="w-full border rounded p-2" />
        </div>
        <button disabled={saving} className="px-4 py-2 rounded bg-black text-white">
          {saving ? "Saving..." : "Create Activity"}
        </button>
      </form>
    </div>
  );
}
