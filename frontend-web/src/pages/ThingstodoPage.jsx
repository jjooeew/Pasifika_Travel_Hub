import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import FlagSidebar        from '../components/FlagSidebar/FlagSidebar';
import CountryActivities  from '../components/CountryActivities/CountryActivities';

import samoaFlag from '../assets/flags/sa.png';
import fijiFlag  from '../assets/flags/fi.png';
import tongaFlag from '../assets/flags/to.png';

import firedancePic     from '../assets/images/firedance.jpg';
import snorkelPic       from '../assets/images/snorkel.jpg';
import samoamuseumPic   from '../assets/images/samoamuseum.jpg';
import papaseeaPic      from '../assets/images/papaseea.jpg';
import denarauPic       from '../assets/images/denarau.png';
import fijimuseumPic    from '../assets/images/fijimuseum.jpg';
import kavaPic          from '../assets/images/kava.jpg';
import haamongaPic      from '../assets/images/haamonga.jpg';
import tongavillagePic  from '../assets/images/tongavillage.jpg';
import tongamuseumPic   from '../assets/images/tongamuseum.jpg';


const COUNTRIES = [
  {
    slug: 'samoa',
    name: 'Samoa',
    flag: samoaFlag,
    description:
      'Enjoy Samoa’s natural beauty with a blend of beach and cultural activities.',
    activities: [
      { img: firedancePic,   title: "Experience the 'Siva' firedance", text: '...' },
      { img: snorkelPic,     title: "Snorkel Samoa's coastal waters",  text: '...' },
      { img: samoamuseumPic, title: 'Robert Louis Stevenson Museum',  text: '...' },
      { img: papaseeaPic,    title: 'Papaseea Sliding Rocks',          text: '...' },
    ],
  },
  {
    slug: 'fiji',
    name: 'Fiji',
    flag: fijiFlag,
    description:
      'Enjoy Fiji’s natural beauty with a blend of beach and cultural activities.',
    activities: [
      { img: kavaPic,        title: 'Attend a kava ceremony',          text: '...' },
      { img: snorkelPic,     title: "Snorkel Fiji's coastal waters",   text: '...' },
      { img: fijimuseumPic,  title: 'Thurston Gardens Fiji Museum',   text: '...' },
      { img: denarauPic,     title: 'Travel to Denarau Port',          text: '...' },
    ],
  },
  {
    slug: 'tonga',
    name: 'Tonga',
    flag: tongaFlag,
    description:
      'Enjoy Tonga’s natural beauty with a blend of beach and cultural activities.',
    activities: [
      { img: tongavillagePic, title: 'Visit a local village',              text: '...' },
      { img: snorkelPic,      title: "Explore Tonga's coral reefs",        text: '...' },
      { img: haamongaPic,     title: 'Haʻamonga ʻa Maui Trilithon',        text: '...' },
      { img: tongamuseumPic,  title: "Visit Tonga's National Museum",      text: '...' },
    ],
  },
];


export default function ThingsToDoPage() {
  const { country: urlSlug } = useParams();  
  const navigate             = useNavigate();

  
  const initialSlug = COUNTRIES.some(c => c.slug === urlSlug) ? urlSlug : 'samoa';
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);

  
  useEffect(() => {
    if (urlSlug !== selectedSlug) {
      const exists = COUNTRIES.some(c => c.slug === urlSlug);
      if (exists) setSelectedSlug(urlSlug);
      else navigate('/samoa/things-to-do', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);

  const handleSelect = slug => navigate(`/${slug}/things-to-do`);

  const activeCountry = COUNTRIES.find(c => c.slug === selectedSlug);

  return (
    <div className="page-layout">
      <FlagSidebar
        countries={COUNTRIES}
        selectedCountry={selectedSlug}
        onSelect={handleSelect}
      />

      <div className="main-content">
        <CountryActivities
          countryName={activeCountry.name}
          description={activeCountry.description}
          activities={activeCountry.activities}
        />
      </div>
    </div>
  );
}
