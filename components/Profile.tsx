import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PromptCard from './PromptCard';  
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    console.log('Data in Profile:', data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.blueGradient}>{name} Profile</Text>
      </Text>
      <Text style={styles.description}>{desc}</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PromptCard
            key={item._id}
            post={item}
            handleEdit={() =>{ handleEdit(item._id) 
                console.log('Post ID:', item._id);

            }}
            handleDelete={() => handleDelete(item._id)}
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.promptLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  blueGradient: {
    color: 'blue',  
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 8,
  },
  promptLayout: {
    marginTop: 20,
  },
});

export default Profile;
