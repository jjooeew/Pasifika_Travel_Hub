
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FlagSidebar   from '../components/FlagSidebar/FlagSidebar';
import TextToSpeech  from '../components/TextToSpeech/TextToSpeech';
import './LanguagePage.css';


import samoaFlag from '../assets/flags/sa.png';
import fijiFlag  from '../assets/flags/fi.png';
import tongaFlag from '../assets/flags/to.png';


const phraseData = {
  samoa: [
    'Talofa lava',
    'O a mai oe?',
    'Manuia le aso',
    'Fa’afetai tele',
  ],
  fiji: [
    'Bula',
    'Vakacava tiko?',
    'Moce mada',
    'Vinaka vaka levu',
  ],
  tonga: [
    'Mālō e lelei',
    'Fēfē hake?',
    'Nofo ā',
    'Mālō aupito',
  ],
};


const countries = [
  { slug: 'samoa', name: 'Samoa', flag: samoaFlag },
  { slug: 'fiji',  name: 'Fiji',  flag: fijiFlag  },
  { slug: 'tonga', name: 'Tonga', flag: tongaFlag },
];

export default function LanguagePage() {
  const { country: urlSlug } = useParams(); 
  const navigate = useNavigate();

  
  const initialSlug = phraseData[urlSlug] ? urlSlug : 'samoa';
  const [selectedSlug, setSelectedSlug] = useState(initialSlug);

  
  useEffect(() => {
    if (urlSlug !== selectedSlug) {
      if (phraseData[urlSlug]) setSelectedSlug(urlSlug);
      else navigate('/samoa/language', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);


  const handleSelect = (slug) => {
    navigate(`/${slug}/language`);
  };

 
  const heading = countries.find(c => c.slug === selectedSlug)?.name ?? '';

  return (
    <div className="language-page">
      <FlagSidebar
        countries={countries}
        selectedCountry={selectedSlug}
        onSelect={handleSelect}
      />

      <div className="phrases-card">
        <h2>{heading} - Useful phrases</h2>
        <ul>
          {phraseData[selectedSlug].map((phrase, i) => (
            <li key={i} className="phrase-line">
              <span>{phrase}</span>
              <TextToSpeech text={phrase} lang="en-US" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
