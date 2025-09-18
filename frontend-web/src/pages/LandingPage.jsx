import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import CountryCard from "../components/CountryCard/CountryCard";
import { getCountries } from "../services/api";

export default function LandingPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getCountries();
        // Your countries endpoint sometimes returns [ ... ] or { countries: [ ... ] }
        const items = res.data?.countries || res.data || [];
        if (!mounted) return;

        // Normalize to CountryCard props
        const mapped = items.map((c) => ({
          id: c._id || c.slug, // keep an id, not React key
          name: c.countryName,
          image: c.flagUrl || "",
          flag: c.flagUrl || "",
          href: `/countries/${c.slug}`,
          intro: c.intro || "",
        }));

        setCards(mapped);
      } catch (e) {
        if (!mounted) return;
        setErr(e?.response?.data?.message || e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <HeroSection />
      {loading && <div className="p-6">Loading countries…</div>}
      {err && <div className="p-6 text-red-600">{err}</div>}
      {!loading && !err && cards.map((c) => <CountryCard key={c.id} {...c} />)}
    </>
  );
}
