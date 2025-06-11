import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlagSidebar from '../components/FlagSidebar/FlagSidebar';
import './HistoryPage.css';


import samoaFlag  from '../assets/flags/sa.png';
import fijiFlag   from '../assets/flags/fi.png';
import tongaFlag  from '../assets/flags/to.png';


import samoHero   from '../assets/images/samoa-history-hero.jpg';
import fijiHero   from '../assets/images/fiji-history-hero.jpg';
import tongaHero  from '../assets/images/tonga-history-hero.jpg';


const HISTORY_DATA = {
  samoa: {
    name: 'Samoa',
    flag: samoaFlag,
    hero: samoHero,
    intro:
      'Samoa’s history stretches back 3,000 years, from Lapita navigators to independence in 1962.',
    timeline: [
      'c. 1000 BC  – First Polynesian settlers arrive',
      '1830 – London Missionary Society arrives',
      '1899 – Tripartite Convention splits Samoa',
      '1962 – Independence from New Zealand',
    ],
    facts: [
      'Samoa was the first Pacific nation to gain independence in the 20th century.',
      'Traditional Samoan tattooing (peʻa) is over 2,000 years old.',
    ],
  },
  fiji: {
    name: 'Fiji',
    flag: fijiFlag,
    hero: fijiHero,
    intro:
      'Fiji’s islands were settled 3,500 years ago; today the nation blends Melanesian roots with Indian and European influences.',
    timeline: [
      'c. 1500 BC – Lapita people arrive',
      '1874 – Cakobau cedes Fiji to Britain',
      '1970 – Independence',
      '1987 – First coup d’état',
    ],
    facts: [
      'Fiji has over 330 islands, but only about 100 are inhabited.',
      'The ancient practice of fire-walking originated on Beqa Island.',
    ],
  },
  tonga: {
    name: 'Tonga',
    flag: tongaFlag,
    hero: tongaHero,
    intro:
      'Known as the “Friendly Islands,” Tonga is the only Pacific kingdom never formally colonised.',
    timeline: [
      'c. 1500 BC – First settlement',
      '1845 – George Tupou I unifies Tonga',
      '1900 – Tonga becomes a British protected state',
      '1970 – Full independence',
    ],
    facts: [
      'The Haʻamonga ʻa Maui trilithon is often called the “Stonehenge of the Pacific.”',
      'Tonga switched from driving on the right to the left in 1974.',
    ],
  },
};


const COUNTRIES = Object.entries(HISTORY_DATA).map(([slug, d]) => ({
  slug,
  name: d.name,
  flag: d.flag,
}));

export default function HistoryPage() {
  const { country: urlSlug } = useParams();
  const navigate             = useNavigate();

 
  const initialSlug = HISTORY_DATA[urlSlug] ? urlSlug : 'samoa';
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);

 
  useEffect(() => {
    if (urlSlug !== selectedSlug) {
      if (HISTORY_DATA[urlSlug]) setSelectedSlug(urlSlug);
      else navigate('/samoa/history', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);

  const data = HISTORY_DATA[selectedSlug];

  
  const handleSelect = (slug) => navigate(`/${slug}/history`);

  return (
    <div className="history-page">
      <FlagSidebar
        countries={COUNTRIES}
        selectedCountry={selectedSlug}
        onSelect={handleSelect}
      />

      <section className="history-main">
        <h1>{data.name} History</h1>
        <p className="history-intro">{data.intro}</p>

        <div className="history-grid">
          <article className="history-timeline">
            <h3>Timeline</h3>
            <ol>
              {data.timeline.map(item => <li key={item}>{item}</li>)}
            </ol>
          </article>

          <figure className="history-photo">
            <img src={data.hero} alt={`${data.name} historic`} />
          </figure>

          <aside className="history-facts">
            <h3>Did you know?</h3>
            <ul>{data.facts.map(f => <li key={f}>{f}</li>)}</ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
