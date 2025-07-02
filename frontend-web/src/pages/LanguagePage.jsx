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
    { text: 'Talofa lava',      translation: 'Hello, greetings'    },
    { text: 'O a mai oe?',      translation: 'How are you?'        },
    { text: 'Manuia le aso',    translation: 'Have a good day'     },
    { text: 'Fa’afetai tele',   translation: 'Thank you very much' },
  ],
  fiji: [
    { text: 'Bula',             translation: 'Hello'               },
    { text: 'Vakacava tiko?',   translation: 'How are you?'        },
    { text: 'Moce mada',        translation: 'Goodbye'             },
    { text: 'Vinaka vaka levu', translation: 'Thank you very much' },
  ],
  tonga: [
    { text: 'Mālō e lelei',     translation: 'Hello'               },
    { text: 'Fēfē hake?',       translation: 'How are you?'        },
    { text: 'Nofo ā',           translation: 'Stay well'           },
    { text: 'Mālō aupito',      translation: 'Many thanks'         },
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

  const initial = phraseData[urlSlug] ? urlSlug : 'samoa';
  const [selected, setSelected] = useState(initial);

  useEffect(() => {
    if (urlSlug !== selected) {
      if (phraseData[urlSlug]) {
        setSelected(urlSlug);
      } else {
        navigate('/samoa/language', { replace: true });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);

  const handleSelect = (slug) => {
    navigate(`/${slug}/language`);
  };

  const heading = countries.find(c => c.slug === selected)?.name || '';

  return (
    <div className="language-page">
      <FlagSidebar
        countries={countries}
        selectedCountry={selected}
        onSelect={handleSelect}
      />

      <div className="phrases-card">
        <h2>{heading} – Useful Phrases</h2>
        <ul>
          {phraseData[selected].map(({ text, translation }, i) => (
            <li key={i} className="phrase-line">
              <div className="phrase-texts">
                <span className="phrase-original">{text}</span>
                <span className="phrase-translation">{translation}</span>
              </div>
              <TextToSpeech text={text} lang="en-US" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
