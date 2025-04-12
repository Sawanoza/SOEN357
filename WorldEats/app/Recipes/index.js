import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import Navbar from '../../components/Navbar';

import { allRecipes } from './allRecipes';


export default function Recipes() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const router = useRouter();

  const filters = [
    'vegan',
    'vegetarian',
    'pescetarian',
    'gluten-free',
    'dessert',
    '<30 min',
    '~1 hour',
    '>1 hour',
  ];

  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const filteredRecipes = allRecipes.filter((recipe) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(recipe.type) || selectedFilters.includes(recipe.time);
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Explore Recipes</Text>

        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilters.includes(filter) && styles.filterButtonActive,
              ]}
              onPress={() => toggleFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilters.includes(filter) && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cardGrid}>
          {filteredRecipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardBlock}
              onPress={() => {
                console.log('Tapped:', recipe.id);
                router.push({ pathname: '/Recipes/[id]', params: { id: recipe.id } });
              }}
              
            >
              <Image source={recipe.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{recipe.title}</Text>
              <Text style={styles.cardSubtitle}>
                {recipe.type} | {recipe.time}
              </Text>
              <Text style={styles.servingsText}>Serves: {recipe.servings}</Text>
            </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginVertical: 20,
    color: '#24A148',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  filterButton: {
    padding: 8,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#24A148',
  },
  filterButtonActive: {
    backgroundColor: '#24A148',
  },
  filterText: {
    color: '#24A148',
    fontSize: 12,
  },
  filterTextActive: {
    color: '#fff',
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
    overflow: 'hidden',
    backgroundColor: '#F2F2F2',
    paddingBottom: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  servingsText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
});
