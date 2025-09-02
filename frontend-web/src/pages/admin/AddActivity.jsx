// frontend-web/src/pages/admin/AdminAddActivity.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createActivity } from "../../services/api";

// Firebase Storage
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminAddActivity() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", description: "", locationLabel: "", tags: "", });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  function onPickFile(e) {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    setPreview(file ? URL.createObjectURL(file) : "")
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true); 
    setErr("");
    try {

      // 1) If file picked, upload to firebase storage
      let imageUrl = "";
      if (imageFile) {
        const safeName = imageFile.name.replace(/\s+/g, "-");
        const storageRef = ref(
          storage,
          `activities/${slug}/${Date.now()}-${safeName}`
        );
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // 2) Build payload in the shape the backend expects
      const payload = {
        title: form.title,
        description: form.description,
        imageUrl,
        locationLabel: form.locationLabel,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      };

      // 3) POST to /api/countries/:slug/activities
      await createActivity(slug, payload);

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
          <input 
            name="title" 
            value={form.title} 
            onChange={onChange}
            className="w-full border rounded p-2" 
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea 
            name="description" 
            value={form.description} 
            onChange={onChange}
            className="w-full border rounded p-2" 
            rows={4} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location label (optional)</label>
          <input
            name="locationLabel"
            value={form.locationLabel}
            onChange={onChange}
            className="w-full border rounded p-2"
            placeholder="e.g., Aitutaki Lagoon"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tags (comma-separated)</label>
          <input
            name="tags"
            value={form.tags}
            onChange={onChange}
            className="w-full border rounded p-2"
            placeholder="beach, snorkeling, culture"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Activity image</label>
          <input type="file" accept="image/*" onChange={onPickFile} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-40 w-full object-cover rounded"
            />
          )}
        </div>

        <button disabled={saving} className="px-4 py-2 rounded bg-black text-white">
          {saving ? "Saving..." : "Create Activity"}
        </button>
      </form>
    </div>
  );
}
