import { useState, useEffect, useRef } from "react";


export default function ActivityForm ({
  initial = null,
  mode = "create",
  submitting = false,
  onSubmit,
}) {
  const hydrated = useRef(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (mode !== "edit") return;
    if (!initial) return;
    if (hydrated.current) return;

    setForm({
      title: initial.title || "",
      description: initial.description || "",
      tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : initial.tags
    });
    setPreview(initial.imageUrl || "");
    setImageFile(null);

    hydrated.current = true
  }, [initial]);

  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onPickFile = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : (initial.imageUrl || ""));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean): [],
    };
    onSubmit(payload, imageFile);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input name="title" value={form.title} onChange={change}
               className="w-full border rounded p-2" required />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea name="description" value={form.description} onChange={change}
                  className="w-full border rounded p-2" rows={4} />
      </div>

      <div>
        <label className="block text-sm font-medium">Tags (comma-separated)</label>
        <input name="tags" value={form.tags} onChange={change}
               className="w-full border rounded p-2" placeholder="beach, snorkeling, culture" />
      </div>

      <div>
        <label className="block text-sm font-medium">Activity image</label>
        <input type="file" accept="image/*" onChange={onPickFile} />
        {preview && (
          <img src={preview} alt="Preview"
               className="mt-2 h-40 w-full object-cover rounded" />
        )}
      </div>

      <button disabled={submitting}
              className="px-4 py-2 rounded bg-black text-white">
        {submitting ? (mode === "edit" ? "Saving..." : "Creating...")
                    : (mode === "edit" ? "Save Changes" : "Create Activity")}
      </button>
    </form>    
  )

}