import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => pathname === route;
  const activeColor = '#24A148';
  const inactiveColor = '#999';

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Home')}>
        <MaterialIcons
          name="home-filled"
          size={26}
          color={isActive('/Home') ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Recipes')}>
        <FontAwesome5
          name="utensils"
          size={22}
          color={isActive('/Recipes') ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Planner')}>
        <MaterialIcons
          name="event-note"
          size={24}
          color={isActive('/Planner') ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/Community')}>
        <Entypo
          name="users"
          size={24}
          color={isActive('/Community') ? activeColor : inactiveColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
});
