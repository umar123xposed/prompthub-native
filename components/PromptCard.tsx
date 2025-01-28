import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Clipboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; 
import { useGlobalContext } from '@/GlobalContext';

const PromptCard = ({ post, handleEdit, handleDelete, handleclick }: { post: any, handleEdit?: Function, handleDelete?: Function, handleclick?: Function }) => {
  const {ID}= useGlobalContext()
  console.log(`glabal:${ID}`)

  const userId= useLocalSearchParams()

  const [copied, setCopied] = useState(false);
  const router = useRouter(); 

  const handleProfileClick = () => {
   
    if (post.creator._id === ID) {
      
      router.push(`/profile?userId=${ID}`);
    } else {
      router.push(`/profile/${post.creator._id}?username=${post.creator.username}`);
;  
    }
  };

  const handleCopy = () => {
    setCopied(true);
    Clipboard.setString(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileContainer} onPress={handleProfileClick}>
          <Image
            source={{ uri: post.creator.image }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{post.creator.username}</Text>
            <Text style={styles.userEmail}>{post.creator.email}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Image
            source={copied ? require('../assets/icons/tick.svg') : require('../assets/icons/copy.svg')}
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.promptText}>{post.prompt}</Text>

      <TouchableOpacity onPress={() => handleclick && handleclick(post.tag)}>
        <Text style={styles.tag}>#{post.tag}</Text>
      </TouchableOpacity>

      {post.creator._id === ID && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  username: {
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#888',
    fontSize: 12,
  },
  copyBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyIcon: {
    width: 20,
    height: 20,
  },
  promptText: {
    marginVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  tag: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  edit: {
    color: '#2ecc71',
    fontSize: 14,
  },
  delete: {
    color: '#e74c3c',
    fontSize: 14,
  },
});

export default PromptCard;
