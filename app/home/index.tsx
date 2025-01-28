// index.tsx in React Native
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Feed from '../../components/Feed' 
const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Discover Prompts</Text>
        <Text style={styles.subHeaderText}>
          <Text style={styles.orangeText}>AI-Powered prompts</Text>
        </Text>
      </View>
      <Text style={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque praesentium excepturi assumenda vitae quidem commodi pariatur earum, molestiae tenetur perspiciatis.
      </Text>
      <Feed />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 24,
    textAlign: 'center',
  },
  orangeText: {
    color: '#FFA500', 
  },
  desc: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 24,
  },
});

export default HomeScreen;
