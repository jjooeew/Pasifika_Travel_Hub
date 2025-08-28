// src/pages/admin/EditCountry.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountry, updateCountry } from "../../services/api";

export default function EditCountry() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ countryName: "", intro: "", history: "", flagUrl: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getCountry(slug);
      const c = res.data?.country || res.data;
      setForm({
        countryName: c.countryName || "",
        intro: c.intro || "",
        history: c.history || "",
        flagUrl: c.flagUrl || "",
      });
      setLoading(false);
    })();
  }, [slug]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateCountry(slug, form);
    alert("Saved");
    nav("/admin/countries");
  };

  if (loading) return null;

  return (
    <form className="formContainer" onSubmit={onSubmit}>
      <input name="countryName" value={form.countryName} onChange={onChange} placeholder="Country name" required />
      <input name="flagUrl" value={form.flagUrl} onChange={onChange} placeholder="Flag URL" />
      <textarea name="intro" value={form.intro} onChange={onChange} placeholder="Intro" />
      <textarea name="history" value={form.history} onChange={onChange} placeholder="History" />
      <button type="submit">Save</button>
    </form>
  );
}
