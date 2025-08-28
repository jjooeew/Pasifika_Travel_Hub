import React, {useEffect, useState} from 'react'
import HeroSection   from '../components/HeroSection/HeroSection';
import CountryCard   from '../components/CountryCard/CountryCard';
import { getCountries } from "../services/api";




// import samoaImg from '../assets/images/samoa.jpg';
// import fijiImg  from '../assets/images/fiji.jpeg';
// import tongaImg from '../assets/images/tonga.jpg';

// import samoaFlag from '../assets/flags/sa.png';
// import fijiFlag  from '../assets/flags/fi.png';
// import tongaFlag from '../assets/flags/to.png';


// export default function LandingPage() {
//   const countries = [
//   { name: 'Samoa',  image: samoaImg, flag: samoaFlag, href: '/samoa'},
//   { name: 'Fiji',  image: fijiImg, flag: fijiFlag, href: '/fiji'},
//   { name: 'Tonga',  image: tongaImg, flag: tongaFlag, href: '/tonga'},
// ];

//   return (
//     <>
//       <HeroSection />
//       {countries.map(c => (
//         <CountryCard key={c.name} {...c} />
//       ))}
//     </>
//   );
// }


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
          key: c._id || c.slug,
          name: c.countryName,
          image: c.flagUrl || "", // TEMP: use flag as image until you add a heroImageUrl
          flag: c.flagUrl || "",
          href: `/countries/${c.slug}`, // link to dynamic country home
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
      {!loading &&
        !err &&
        cards.map((c) => <CountryCard key={c.key} {...c} />)}
    </>
  );
}