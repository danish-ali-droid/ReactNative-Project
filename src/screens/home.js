import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const stories = [
  { id: '1', name: 'Danish', image: 'https://placekitten.com/80/80' },
  { id: '2', name: 'Ali', image: 'https://placekitten.com/81/80' },
  { id: '3', name: 'Sarah', image: 'https://placekitten.com/82/80' },
  { id: '4', name: 'Afaq', image: 'https://placekitten.com/83/80' },
];

const posts = [
  { id: '1', user: 'Danish', time: '2h ago', text: 'Hello World!', likes: 12, comments: 5 },
  { id: '2', user: 'Ali', time: '5h ago', text: 'React Native is awesome!', likes: 24, comments: 6 },
];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4267B2" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Facebook</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="notifications-outline" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="chatbubble-ellipses-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Icon name="search" size={20} color="#999" />
        <TextInput
          placeholder="Search Facebook"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Stories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {stories.map(story => (
              <View key={story.id} style={styles.storyCard}>
                <Image source={{ uri: story.image }} style={styles.storyImage} />
                <Text style={styles.storyName}>{story.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Posts */}
        <View style={styles.section}>
          {posts.map(post => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Icon name="person-circle-outline" size={40} color="#555" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.postUser}>{post.user}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
              </View>
              <Text style={styles.postText}>{post.text}</Text>
              <View style={styles.postFooter}>
                <Text>{post.likes} Likes</Text>
                <Text>{post.comments} Comments</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },

  header: {
    backgroundColor: '#4267B2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },
  iconBtn: { marginLeft: 15 },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 40,
  },
  searchInput: { flex: 1, marginLeft: 10 },

  section: { marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 },

  storyCard: { alignItems: 'center', marginHorizontal: 10 },
  storyImage: { width: 70, height: 70, borderRadius: 35 },
  storyName: { marginTop: 5, fontSize: 12 },

  postCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 10,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  postUser: { fontWeight: 'bold', fontSize: 14 },
  postTime: { fontSize: 12, color: '#555' },
  postText: { marginBottom: 10 },

  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    paddingTop: 5,
  },
});
