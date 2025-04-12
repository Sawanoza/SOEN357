import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Navbar from '../components/Navbar';

export default function Community() {
  const sections = {
    Videos: [
      {
        image: require('../assets/community1.jpg'),
        text: 'Watch this video to learn a quick and calming breakfast recipe from around the world...',
        link: 'https://www.youtube.com/shorts/jMh8ZvK5qxk',
      },
      {
        image: require('../assets/community2.jpg'),
        text: 'Discover nutritious and time-saving meal prep routines inspired by global cuisines...',
        link: 'https://www.youtube.com/shorts/HgwEsjrJSA4',
      },
    ],
    Groups: [
      {
        image: require('../assets/community3.webp'),
        text: 'Connect with others who share your culinary interests...',
      },
      {
        image: require('../assets/community4.jpg'),
        text: 'Stay inspired and motivated by joining cultural-themed recipe challenges...',
      },
    ],
    Forums: [
      {
        image: require('../assets/community5.jpg'),
        text: 'Discuss how to adapt international dishes to your dietary goals...',
      },
      {
        image: require('../assets/community6.jpg'),
        text: 'Share your food rituals and learn about others...',
      },
    ],
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Community</Text>

        <Text style={styles.sectionHeader}>Videos {'>'}</Text>
        <View style={styles.cardRow}>
        {sections.Videos.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cardBlock}
            onPress={() => openLink(item.link)}
          >
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.cardImage} />
              <Image source={require('../assets/play.png')} style={styles.playIcon} />
            </View>
            <Text style={styles.caption}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>


        <Text style={styles.sectionHeader}>Groups {'>'}</Text>
        <View style={styles.cardRow}>
          {sections.Groups.map((item, index) => (
            <View key={index} style={styles.cardBlock}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.caption}>{item.text}</Text>
              <View style={styles.fakeButton}>
                <Text style={styles.fakeButtonText}>Join</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeader}>Forums {'>'}</Text>
        <View style={styles.cardRow}>
          {sections.Forums.map((item, index) => (
            <View key={index} style={styles.cardBlock}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.caption}>{item.text}</Text>
              <View style={styles.fakeButton}>
                <Text style={styles.fakeButtonText}>Enter</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingTop: 40,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#24A148',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  cardBlock: {
    width: '45%',
    backgroundColor: '#E9F5EE',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  caption: {
    fontSize: 13,
    color: '#444',
    marginTop: 8,
    textAlign: 'center',
  },
  fakeButton: {
    marginTop: 10,
    backgroundColor: '#24A148',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  fakeButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 120,
  },
  
  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 30,
    height: 30,
    transform: [{ translateX: -15 }, { translateY: -15 }],
    opacity: 0.8,
  },
  
});
