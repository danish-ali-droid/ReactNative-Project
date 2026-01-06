import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

/* =======================
   DASHBOARD DATA (SINGLE)
======================= */
const dashboardData = {
  user: {
    greeting: 'Good Morning 👋',
    name: 'Danish Ali',
  },

  stats: [
    { label: 'Projects', value: '12', icon: 'folder', color: '#3498db' },
    { label: 'Tasks', value: '8', icon: 'checkmark-circle', color: '#2ecc71' },
    { label: 'Messages', value: '24', icon: 'chatbubbles', color: '#e74c3c' },
    { label: 'Team', value: '6', icon: 'people', color: '#9b59b6' },
  ],

  actions: [
    { title: 'New Task', icon: 'add-circle', color: '#3498db' },
    { title: 'Reports', icon: 'bar-chart', color: '#2ecc71' },
    { title: 'Calendar', icon: 'calendar', color: '#e74c3c' },
    { title: 'Settings', icon: 'settings', color: '#9b59b6' },
  ],

  activities: [
    { id: 1, title: 'Project Meeting', time: '10:00 AM', icon: 'people', color: '#3498db' },
    { id: 2, title: 'Task Completed', time: '11:30 AM', icon: 'checkmark-circle', color: '#2ecc71' },
    { id: 3, title: 'New Message', time: '02:15 PM', icon: 'chatbubble', color: '#e74c3c' },
    { id: 4, title: 'Report Generated', time: '04:45 PM', icon: 'document-text', color: '#9b59b6' },
  ],
};

const HomeScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(3);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{dashboardData.user.greeting}</Text>
          <Text style={styles.userName}>{dashboardData.user.name}</Text>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setNotifications(0)}>
            <Icon name="notifications" size={24} color="#fff" />
            {notifications > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notifications}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <Icon name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* STATS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {dashboardData.stats.map((item, i) => (
            <View key={i} style={styles.card}>
              <Icon name={item.icon} size={30} color={item.color} />
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* ACTIONS */}
        <View style={styles.grid}>
          {dashboardData.actions.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.actionCard}
              onPress={() => Alert.alert(item.title, 'Coming Soon')}
            >
              <Icon name={item.icon} size={28} color={item.color} />
              <Text style={styles.actionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ACTIVITIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {dashboardData.activities.map(item => (
            <View key={item.id} style={styles.activity}>
              <Icon name={item.icon} size={22} color={item.color} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

/* =======================
        STYLES
======================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },

  header: {
    backgroundColor: '#3498db',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  greeting: { color: '#ecf0f1', fontSize: 14 },
  userName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },

  headerIcons: { flexDirection: 'row', gap: 15 },

  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: { color: '#fff', fontSize: 10 },

  row: { marginTop: 15, paddingLeft: 15 },

  card: {
    backgroundColor: '#fff',
    width: width * 0.4,
    marginRight: 15,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },

  value: { fontSize: 26, fontWeight: 'bold', marginTop: 10 },
  label: { color: '#7f8c8d' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  actionCard: {
    backgroundColor: '#fff',
    width: width * 0.4,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },

  actionText: { marginTop: 8, fontWeight: '600' },

  section: { padding: 20 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },

  activity: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  activityTitle: { fontWeight: '600' },
  activityTime: { color: '#7f8c8d', fontSize: 12 },
});