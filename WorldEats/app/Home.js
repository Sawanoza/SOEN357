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

export default function Home() {
  const handleFeedbackPress = () => {
    Linking.openURL('https://forms.gle/q4s95bSdsZWDQjqj8');
  };

  const communityUpdates = [
    {
      caption: 'Share your favourite cultural recipes with the WorldEats community!',
      image: require('../assets/home1.jpg'),
    },
    {
      caption: 'Explore recipes from around the world and tell us how your experience went!',
      image: require('../assets/home2.jpg'),
    },
    {
      caption: 'Join discussions on how to adapt international dishes to your dietary goals!',
      image: require('../assets/home3.jpg'),
    },
    {
      caption: 'Learn how others use food to relax, connect to heritage, and share their own rituals.',
      image: require('../assets/home4.jpg'),
    },
    {
      caption: 'Join our weekly meal planning threads to stay organized and inspired.',
      image: require('../assets/home5.jpg'),
    },
    {
      caption: 'Share tips and tricks on cultural food prep and traditions.',
      image: require('../assets/home6.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome back to</Text>
          <Text style={styles.title}>WorldEats</Text>
        </View>

        <Text style={styles.sectionTitle}>Community Updates</Text>

        <View style={styles.cardGrid}>
          {communityUpdates.map((item, index) => {
            const isLeftColumn = index % 2 === 0;
            const row = Math.floor(index / 2);
            const backgroundColor =
              row % 2 === 0
                ? isLeftColumn
                  ? '#E9F5EE'
                  : '#C4E2CE'
                : isLeftColumn
                ? '#C4E2CE'
                : '#E9F5EE';

            return (
              <View
                key={index}
                style={[
                  styles.cardBlock,
                  {
                    backgroundColor,
                  },
                ]}
              >
                <Image source={item.image} style={styles.card} />
                <Text style={styles.caption}>{item.caption}</Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedbackPress}>
          <Text style={styles.feedbackText}>Leave Feedback</Text>
        </TouchableOpacity>
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
  },
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#24A148',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  cardBlock: {
    width: '45%',
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  card: {
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
  feedbackButton: {
    backgroundColor: '#24A148',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  feedbackText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
