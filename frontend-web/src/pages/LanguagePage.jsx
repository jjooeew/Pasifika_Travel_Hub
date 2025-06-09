import React, { useState } from 'react';
import FlagSidebar from '../components/FlagSidebar/FlagSidebar';
import TextToSpeech from '../components/TextToSpeech/TextToSpeech';
import './LanguagePage.css';

import samoaFlag from '../assets/flags/sa.png';
import fijiFlag from '../assets/flags/fi.png';
import tongaFlag from '../assets/flags/to.png';
 

const phraseData = {
  Samoa: [
    'Talofa lava', 
    'O a mai oe?', 
    'Manuia le aso', 
    'Fa’afetai tele'
  ],
  Fiji: [
    'Bula', 
    'Vakacava tiko?', 
    'Moce mada', 
    'Vinaka vaka levu'
  ],
  Tonga: [
    'Mālō e lelei', 
    'Fēfē hake?', 
    'Nofo ā', 
    'Mālō aupito'
  ]
};

const LanguagePage = () => {
  const [selectedCountry, setSelectedCountry] = useState('Samoa');

  const countries = [
    { name: 'Samoa', flag: samoaFlag },
    { name: 'Fiji', flag: fijiFlag },
    { name: 'Tonga', flag: tongaFlag },
  ];

  return (
    <div className="language-page">
      <FlagSidebar
        countries={countries}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
      />

      <div className="phrases-card">
        <h2>Useful phrases</h2>
        <ul>
          {phraseData[selectedCountry].map((phrase, index) => (
            <li key={index} className="phrase-line">
              <span>{phrase}</span>
              <TextToSpeech text={phrase} lang="en-US" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguagePage;
