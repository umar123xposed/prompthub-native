import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"; 

import Profile from "../../../components/Profile";

const ProfileDetail = () => {
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const { userId, username } = useLocalSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://prompt-hub-sigma.vercel.app/api/users/${userId}/posts`);
        const data = await response.json();
        setUserPosts(data);
        console.log('Fetched posts:', data);

      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);
  console.log('User Posts:', userPosts);
  console.log('Route Parameters:', { userId, username });



  if (!userId || !username) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Invalid user details.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff"}}>
      <Profile
        name={username}
        desc={`Welcome to ${username}'s personalized profile page. Explore their exceptional prompts and be inspired.`}
        data={userPosts}
      />
    </View>
  );
};

export default ProfileDetail;
