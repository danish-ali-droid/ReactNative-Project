import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(3);

 
  const stats = [
    { label: 'Projects', value: '12', icon: 'folder', color: '#3498db' },
    { label: 'Tasks', value: '8', icon: 'checkmark-circle', color: '#2ecc71' },
    { label: 'Messages', value: '24', icon: 'chatbubbles', color: '#e74c3c' },
    { label: 'Team', value: '6', icon: 'people', color: '#9b59b6' },
  ];

  const quickActions = [
    { title: 'New Task', icon: 'add-circle', color: '#3498db' },
    { title: 'Reports', icon: 'bar-chart', color: '#2ecc71' },
    { title: 'Calendar', icon: 'calendar', color: '#e74c3c' },
    { title: 'Settings', icon: 'settings', color: '#9b59b6' },
  ];

  const recentActivities = [
    { id: 1, title: 'Project Meeting', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Task Completed', time: '11:30 AM', type: 'task' },
    { id: 3, title: 'New Message', time: '02:15 PM', type: 'message' },
    { id: 4, title: 'Report Generated', time: '04:45 PM', type: 'report' },
  ];

  const teamMembers = [
    { id: 1, name: 'Shahid', role: 'Developer', online: true },
    { id: 2, name: 'Afaq', role: 'Designer', online: true },
    { id: 3, name: 'Danish Ali', role: 'Manager', online: false },
    { id: 4, name: 'ZainAbbas', role: 'Tester', online: true },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', `You have ${notifications} unread notifications`);
    setNotifications(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good Morning 👋</Text>
            <Text style={styles.userName}>Danish Ali</Text>
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.notificationBtn}
              onPress={handleNotificationPress}
            >
              <Icon name="notifications" size={24} color="#fff" />
              {notifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>{notifications}</Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleLogout}>
              <Icon name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search tasks, projects, or messages...</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Dashboard Overview</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.statsScroll}
          >
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Icon name={stat.icon} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.actionCard}
                onPress={() => Alert.alert(action.title, 'Feature coming soon!')}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Icon name={action.icon} size={28} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      
        <View style={styles.activitiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activitiesList}>
            {recentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[
                  styles.activityIcon,
                  { 
                    backgroundColor: activity.type === 'meeting' ? '#3498db20' :
                                    activity.type === 'task' ? '#2ecc7120' :
                                    activity.type === 'message' ? '#e74c3c20' : '#9b59b620'
                  }
                ]}>
                  <Icon 
                    name={
                      activity.type === 'meeting' ? 'people' :
                      activity.type === 'task' ? 'checkmark-circle' :
                      activity.type === 'message' ? 'chatbubble' : 'document-text'
                    } 
                    size={20} 
                    color={
                      activity.type === 'meeting' ? '#3498db' :
                      activity.type === 'task' ? '#2ecc71' :
                      activity.type === 'message' ? '#e74c3c' : '#9b59b6'
                    } 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#95a5a6" />
              </View>
            ))}
          </View>
        </View>

   
        <View style={styles.teamSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Team Members</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.teamScroll}
          >
            {teamMembers.map((member) => (
              <View key={member.id} style={styles.teamCard}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.avatarText}>
                    {member.name.charAt(0)}
                  </Text>
                  {member.online && <View style={styles.onlineDot} />}
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <TouchableOpacity style={styles.messageBtn}>
                  <Icon name="chatbubble-outline" size={16} color="#3498db" />
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>18</Text>
              <Text style={styles.eventMonth}>DEC</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Team Review Meeting</Text>
              <Text style={styles.eventTime}>⏰ 2:00 PM - 4:00 PM</Text>
              <Text style={styles.eventLocation}>📍 Conference Room A</Text>
            </View>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinBtnText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

   
        <View style={styles.footer}>
        
          <Text style={styles.footerSubText}>Welcome to your workspace</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#3498db',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#ecf0f1',
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  notificationBtn: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  statsSection: {
    marginTop: 20,
  },
  statsScroll: {
    paddingBottom: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: width * 0.4,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  actionsSection: {
    marginTop: 25,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: width * 0.43,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  activitiesSection: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  activitiesList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#95a5a6',
  },
  teamSection: {
    marginTop: 25,
  },
  teamScroll: {
    paddingBottom: 10,
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: width * 0.35,
    marginRight: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2ecc71',
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    gap: 5,
  },
  messageText: {
    color: '#3498db',
    fontSize: 12,
    fontWeight: '500',
  },
  eventsSection: {
    marginTop: 25,
    marginBottom: 30,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  eventDate: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginRight: 15,
    minWidth: 60,
  },
  eventDay: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventMonth: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  joinBtn: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 40,
  },
  footerText: {
    color: '#95a5a6',
    fontSize: 12,
  },
  footerSubText: {
    color: '#7f8c8d',
    fontSize: 14,
    marginTop: 5,
  },
});

export default HomeScreen;