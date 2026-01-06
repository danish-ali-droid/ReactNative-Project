// SettingsScreen.js

import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => setIsDarkMode(previous => !previous);
  const toggleNotifications = () => setNotificationsEnabled(previous => !previous);

  const handleLogout = () => {
    // Add your logout logic here
    alert('Logged out successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Profile Section */}
      <TouchableOpacity style={styles.option} onPress={() => alert('Go to Profile')}>
        <Text style={styles.optionText}>Profile</Text>
      </TouchableOpacity>

      {/* Notifications */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      {/* Dark Mode */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity style={[styles.option, styles.logout]} onPress={handleLogout}>
        <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 18,
  },
  logout: {
    marginTop: 30,
  },
});

export default SettingsScreen;
