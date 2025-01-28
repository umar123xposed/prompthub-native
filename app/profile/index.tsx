import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert} from "react-native";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Profile from "../../components/Profile";
import { useLocalSearchParams, useRouter } from "expo-router";

const MyProfile = () => {
  const router = useRouter()
  const userId = useLocalSearchParams() 
  const userID = userId.userId
  const [user, setUser] = useState<any>(null);
  const [myPosts, setMyPosts] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      console.log(currentUser)
    });
 
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userID) {
  
      const fetchPosts = async () => {
        try {
          const response = await fetch(`https://prompt-hub-sigma.vercel.app/api/users/${userID}/posts`);
          const data = await response.json();
          setMyPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
    }
  }, [userID]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please log in to view your profile.</Text>
        <Button title="Log In" onPress={() => console.log("Navigate to Login Flow")} />
      </View>
    );
  }

  const handleEdit = (post) => {
  
    console.log("Editing post with ID:", post._id);
    router.push(`/update-prompt?id=${post}`);
  };
  
  
  
  const handleDelete = async (postOrId) => {
    const postId = typeof postOrId === "string" ? postOrId : postOrId._id;
  
    if (!postId) {
      console.error("Invalid post ID:", postOrId);
      return;
    }
  
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
  
    if (hasConfirmed) {
      try {
        const response = await fetch(
          `https://prompt-hub-sigma.vercel.app/api/prompt/${postId}`,
          { method: "DELETE" }
        );
  
        if (response.ok) {
          const filteredPosts = myPosts.filter((item) => item._id !== postId);
          setMyPosts(filteredPosts);
        } else {
          console.error("Failed to delete post:", await response.text());
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff"}}>
      <Profile
        name={user?.displayName || "My"}
        desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others."
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </View>
  );
};

export default MyProfile;
