import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

type VideoEmbedProps = {
  videoId: string;       
  height?: number;       
};

const { width: screenWidth } = Dimensions.get('window');

const VideoEmbed: React.FC<VideoEmbedProps> = ({ videoId, height = 200 }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1`;

  return (
    <View style={[styles.container, { height }]}>
      <WebView
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        source={{ uri: embedUrl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,  
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
});

export default VideoEmbed;
