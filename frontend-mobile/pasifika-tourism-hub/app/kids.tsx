import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ScreenWrapper from '../layouts/ScreenWrapper';
import VideoEmbed from '../components/VideoEmbed';

const { width: screenWidth } = Dimensions.get('window');
const BUTTON_MARGIN = 16;
const CIRCLE_SIZE = screenWidth * 0.6;       
const PILL_WIDTH = screenWidth * 0.85;       
const PILL_HEIGHT = 60;
const VIDEO_SPACING = 24;                    

export default function KidsPage() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Kids Zone</Text>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.videoContainer}>
            <View style={styles.videoWrapper}>
              <VideoEmbed videoId="gl25ln8vIkA" height={240} />
            </View>
            <View style={styles.videoWrapper}>
              <VideoEmbed videoId="79DijItQXMM" height={240} />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.circleButton}
              activeOpacity={0.8}
              onPress={() => console.log('Top 10 pressed')}
            >
              <Text style={styles.circleText}>
                Top 10 Island Activities{`\n`}For Kids!
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pillButton}
              activeOpacity={0.8}
              onPress={() => console.log('Pasifika game pressed')}
            >
              <Text style={styles.pillText}>Play our new Pasifika game!!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 30,
    marginTop: -50,
    marginBottom: 100,   
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  videoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  videoWrapper: {
    marginBottom: VIDEO_SPACING,
  },
  buttonsContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  circleButton: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#e87c24',   
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: BUTTON_MARGIN,
    paddingHorizontal: 16,
  },
  circleText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
  },
  pillButton: {
    width: PILL_WIDTH,
    height: PILL_HEIGHT,
    borderRadius: PILL_HEIGHT / 2,
    backgroundColor: '#7fc8a9',   
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: BUTTON_MARGIN,
    paddingHorizontal: 16,
  },
  pillText: {
    color: '#1a1a1a',
    fontSize: 16,
    textAlign: 'center',
  },
});
