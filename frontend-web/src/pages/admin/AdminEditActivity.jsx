// frontend-web/src/pages/admin/AdminEditActivity.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity, updateActivity } from "../../services/api";
import ActivityForm from "../../components/ActivityForm";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminEditActivity() {
  const { id } = useParams();           // route: /admin/activities/:id/edit
  const navigate = useNavigate();
  const [initial, setInitial] = useState(null);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let on = true;
    getActivity(id)
      .then(r => { if (on) setInitial(r.data); })
      .catch(e => setErr(e?.response?.data?.message || e.message));
    return () => { on = false; };
  }, [id]);

  async function uploadIfNeeded(countrySlug, file) {
    if (!file) return null;  // means: keep existing URL
    const safeName = file.name.replace(/\s+/g, "-");
    const storageRef = ref(storage, `activities/${countrySlug}/${Date.now()}-${safeName}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  const handleSubmit = async (payload, file) => {
    if (!initial) return;
    setSaving(true); setErr("");
    try {
      // If a new file is picked, upload and replace imageUrl; otherwise keep the old one
      const maybeUrl = await uploadIfNeeded(initial.countrySlug, file);
      const finalPayload = { ...payload, imageUrl: maybeUrl ?? initial.imageUrl };
      await updateActivity(id, finalPayload);

      // Send them back where they likely came from (admin list). Fallback to country page.
      navigate(-1);
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to update activity");
    } finally {
      setSaving(false);
    }
  };

  if (err) return <div className="max-w-xl mx-auto p-6 text-red-600">{err}</div>;
  if (!initial) return <div className="max-w-xl mx-auto p-6">Loading activity…</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Activity</h1>
      <ActivityForm
        mode="edit"
        initial={initial}
        submitting={saving}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
