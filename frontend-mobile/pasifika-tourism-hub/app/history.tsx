import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import ScreenWrapper from '../layouts/ScreenWrapper';

// Static history data
const HISTORY_DATA: Record<
  'samoa' | 'fiji' | 'tonga',
  {
    name: string;
    flag: any;
    hero: any;
    photo: any;
    intro: string;
    timeline: string[];
    facts: string[];
  }
> = {
  samoa: {
    name: 'Samoa',
    flag: require('../assets/flags/sa.png'),
    hero: require('../assets/images/samoa-history-hero.jpg'),
    photo: require('../assets/images/SamoaHistoryMain.jpg'),
    intro:
      'Samoa’s history stretches back 3,000 years, from Lapita navigators to independence in 1962.',
    timeline: [
      'c. 1000 BC – First Polynesian settlers arrive',
      '1722 – First recorded European sighting by Jacob Roggeveen',
      '1830 – London Missionary Society brings Christianity',
      '1889 – Samoan Crisis (Germany–US standoff)',
      '1899 – Tripartite Convention partitions the islands',
      '1914 – New Zealand forces occupy German Samoa',
      '1918 – Spanish flu epidemic kills ~22% of population',
      '1962 – First Pacific nation to regain independence',
    ],
    facts: [
      '“Samoa” means Sacred Centre in Polynesian cosmology.',
      'The Mau movement (1920s–30s) was a non-violent independence struggle.',
      'Traditional tattoo (pe‘a / malu) takes several days and is done with bone combs.',
      'Samoa switched the side of the road (to the left) in 2009.',
      'In 2011 Samoa jumped the International Date Line, skipping 30 Dec.',
      'Savai‘i is one of Earth’s most recently formed subaerial volcanoes.',
    ],
  },
  fiji: {
    name: 'Fiji',
    flag: require('../assets/flags/fi.png'),
    hero: require('../assets/images/fiji-history-hero.jpg'),
    photo: require('../assets/images/FijiHistoryMain.jpg'),
    intro:
      'Fiji’s islands were settled 3,500 years ago; today the nation blends Melanesian roots with Indian and European influences.',
    timeline: [
      'c. 1500 BC – Lapita peoples arrive with pottery & sailing tech',
      '1643 – Abel Tasman sights Vanua Levu & Taveuni',
      '1874 – Chief Cakobau cedes Fiji to Britain',
      '1879 – First Indian indentured labourers arrive',
      '1942 – US Marines base established during WWII',
      '1970 – Independence within the Commonwealth',
      '1987 – Two military coups trigger a republic',
      '2014 – Return to democratic elections after 2006 coup',
    ],
    facts: [
      'Fiji has three official languages: Fijian, Hindi, and English.',
      'The 333 islands of Fiji cover an EEZ the size of Germany.',
      'Fire-walking began on Beqa Island over 500 years ago.',
      'Fijian rugby sevens won Olympic gold in 2016 & 2020.',
      'Fiji’s currency features a nanai (bearded lizard) found nowhere else.',
      'Sigatoka Sand Dunes are Fiji’s first national park and an ancient burial site.',
    ],
  },
  tonga: {
    name: 'Tonga',
    flag: require('../assets/flags/to.png'),
    hero: require('../assets/images/tonga-history-hero.jpg'),
    photo: require('../assets/images/TongaHistoryMain.jpg'),
    intro:
      'Known as the “Friendly Islands,” Tonga is the only Pacific kingdom never formally colonised.',
    timeline: [
      'c. 1500 BC – First Lapita settlements on Tongatapu',
      '1616 – First European contact: Dutch vessel Eendracht',
      '1845 – King George Tupou I unifies Tonga',
      '1875 – First written constitution proclaimed',
      '1900 – Tonga becomes a British protected state',
      '1943 – Tongan troops fight in the Solomon Islands',
      '1970 – Full sovereignty regained; joins Commonwealth',
      '2022 – Hunga Tonga–Hunga Haʻapai volcanic eruption & tsunami',
    ],
    facts: [
      'Tonga spans 170 islands but only 36 are permanently inhabited.',
      'The Tongan calendar still uses traditional lunar months.',
      'Haʻamonga ʻa Maui trilithon weighs ~40 tons per upright stone.',
      'ʻUliʻuli peka is a unique Tongan fruit bat regarded as a delicacy.',
      'Tonga’s monarch waived personal salary after 2011 reforms.',
      'It is illegal to conduct most business in Tonga on Sundays.',
    ],
  },
};

const { width: screenWidth } = Dimensions.get('window');

export default function HistoryPage() {
  const [selected, setSelected] = useState<'samoa' | 'fiji' | 'tonga'>('samoa');
  const data = HISTORY_DATA[selected];

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={data.hero} style={styles.hero} />

        <Text style={styles.title}>{data.name} History</Text>

        <Text style={styles.intro}>{data.intro}</Text>

        <View style={styles.flagContainer}>
          {(['samoa', 'fiji', 'tonga'] as const).map(slug => {
            const country = HISTORY_DATA[slug];
            return (
              <TouchableOpacity
                key={slug}
                onPress={() => setSelected(slug)}
                style={[
                  styles.flagBox,
                  selected === slug && styles.flagActive,
                ]}
              >
                <Image source={country.flag} style={styles.flagImage} />
                <Text style={styles.flagLabel}>{country.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Image source={data.photo} style={styles.photoBanner} />
        <View style={styles.grid}>
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Timeline</Text>
              {data.timeline.map((item, i) => (
                <Text key={i} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Did you know?</Text>
              {data.facts.map((fact, i) => (
                <Text key={i} style={styles.listItem}>• {fact}</Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
  hero: {
    width: '100%',
    height: (screenWidth * 5) / 16,
    resizeMode: 'cover',
    marginBottom: 0,
  },
  title: {
    fontFamily: 'GreatVibes',
    fontSize: 32,
    textAlign: 'center',
    marginVertical: 12,
  },
  intro: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  flagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  flagBox: {
    alignItems: 'center',
    marginHorizontal: 30,
    opacity: 0.6,
  },
  flagActive: {
    opacity: 1,
  },
  flagImage: {
    width: 64,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  flagLabel: {
    fontSize: 14,
    color: '#333',
  },
  photoBanner: {
    width: screenWidth * 0.9,
    height: 380,
    borderRadius: 6,
    resizeMode: 'stretch',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  leftColumn: {
    flex: 2,
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
});

