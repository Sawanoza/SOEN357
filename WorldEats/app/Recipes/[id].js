import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { allRecipes } from './allRecipes';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const recipe = allRecipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recipe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={recipe.image} style={styles.heroImage} />

      <Text style={styles.title}>{recipe.title}</Text>

      <Text style={styles.info}>
        {recipe.type} • {recipe.time} • Serves {recipe.servings}
      </Text>

      <View style={styles.originContainer}>
        <Text style={styles.flag}>{recipe.origin?.flag ?? '🌍'}</Text>
        <Text style={styles.originText}>{recipe.origin?.country ?? 'Unknown'}</Text>
      </View>


      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        {recipe.description
          ? showFullDesc
            ? recipe.description
            : recipe.description.slice(0, 100) + '...'
          : 'No description available.'}
      </Text>
      <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)}>
        <Text style={styles.showMore}>
          {showFullDesc ? 'Show less ▲' : 'Show more ▼'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Instructions</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} style={styles.step}>
          {index + 1}. {step}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#24A148',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  originContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  flag: {
    fontSize: 18,
    marginRight: 8,
  },
  originText: {
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  showMore: {
    color: '#24A148',
    marginTop: 5,
  },
  step: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
});
