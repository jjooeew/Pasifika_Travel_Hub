// frontend-web/src/pages/CountryPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountry } from "../services/api";
import "./CountryPage.css";

export default function CountryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getCountry(slug);
        if (mounted) setCountry(res.data.country || res.data);
      } catch (e) {
        if (mounted) setErr(e?.response?.data?.message || e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;
  if (!country) return <div className="p-6">Country not found</div>;

  return (
    <div className="country-page">
      <div className="country-hero">
        {country.flagUrl && (
          <img
            src={country.flagUrl}
            alt={`${country.countryName} flag`}
            className="country-flag"
          />
        )}
        <h1 className="country-title">{country.countryName}</h1>
      </div>

      <div className="country-intro">
        <h2>Introduction</h2>
        <p>{country.intro || "No intro available yet."}</p>
      </div>

      <div className="country-history">
        <h2>History</h2>
        <p>{country.history || "No history added yet."}</p>
      </div>

      <div className="country-actions">
        <button
          className="btn btn--primary"
          onClick={() => navigate(`/countries/${slug}/things-to-do`)}
        >
          View Things to Do →
        </button>
      </div>
    </div>
  );
}
