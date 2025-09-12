// frontend-web/src/pages/admin/AdminAddActivity.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createActivity } from "../../services/api";
import ActivityForm from "../../components/ActivityForm";

// Firebase Storage
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminAddActivity() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function uploadIfNeeded(slug, file) {
    if (!file) return ""; // no image provided
    const safeName = file.name.replace(/\s+/g, "-");
    const storageRef = ref(storage, `activities/${slug}/${Date.now()}-${safeName}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  const handleSubmit = async (payload, file) => {
    setSaving(true); setErr("");
    try {
      const imageUrl = await uploadIfNeeded(slug, file);
      await createActivity(slug, { ...payload, imageUrl });
      navigate(`/countries/${slug}/things-to-do`);
    } catch (e) {
      setErr(e?.response?.data?.message || e?.response?.data?.msg || e.message || "Failed to create activity");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Activity ({slug})</h1>
      {err && <div className="mb-3 text-red-600">{err}</div>}
      <ActivityForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
