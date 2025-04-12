import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { format, startOfWeek, addDays } from 'date-fns';
import Navbar from '../components/Navbar';
import { allRecipes } from './Recipes/allRecipes';
import { planner, updatePlanner } from './db'; // ✅ Use shared in-memory planner

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Planner() {
  const [localPlanner, setLocalPlanner] = useState({ ...planner });
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  const daysWithDates = daysOfWeek.map((day, index) => {
    const date = addDays(weekStart, index);
    return {
      day,
      dateLabel: format(date, 'EEE, MMM d'),
    };
  });

  const assignRecipeToDay = (day, recipe) => {
    updatePlanner(day, recipe); // ✅ Update the shared planner
    setLocalPlanner({ ...planner }); // ✅ Sync it to local state to trigger re-render
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weekly Meal Planner</Text>

      <FlatList
        data={daysWithDates}
        keyExtractor={(item) => item.day}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.dayBlock}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={styles.dateText}>{item.dateLabel}</Text>
            </View>

            {localPlanner[item.day].length > 0 ? (
              localPlanner[item.day].map((recipe, index) => (
                <View key={index} style={styles.recipeRow}>
                  <Text style={styles.recipeFlag}>{recipe.origin?.flag ?? '🌍'}</Text>
                  <Text style={styles.recipeText}>{recipe.title}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noRecipeText}>No meals added yet</Text>
            )}

            <TouchableOpacity onPress={() => handleDayPress(item.day)}>
              <Text style={styles.addMore}>➕ Add recipe</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Recipe for {selectedDay}</Text>
            <ScrollView>
              {allRecipes.map((recipe) => (
                <Pressable
                  key={recipe.id}
                  style={styles.recipeOption}
                  onPress={() => assignRecipeToDay(selectedDay, recipe)}
                >
                  <Text style={styles.recipeName}>
                    {recipe.origin?.flag ?? '🌍'} {recipe.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24A148',
    padding: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  dayBlock: {
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#24A148',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  recipeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingLeft: 10,
  },
  recipeFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  recipeText: {
    fontSize: 14,
    color: '#333',
  },
  noRecipeText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 6,
    paddingLeft: 10,
  },
  addMore: {
    fontSize: 14,
    color: '#24A148',
    marginTop: 10,
    paddingLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    maxHeight: '70%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#24A148',
  },
  recipeOption: {
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  recipeName: {
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    marginTop: 15,
    textAlign: 'center',
    color: '#999',
  },
});
