import React, { useState } from "react";
import { Alert } from "react-native";
import { auth } from "../../firebase/firebaseConfig";

import Form from "../../components/Form";
import { useLocalSearchParams } from "expo-router";

const CreatePost = () => {
  const userId= useLocalSearchParams()
  const userID= userId.userId

  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async () => {
    if (!post.prompt.trim() || !post.tag.trim()) {
      Alert.alert("Validation Error", "Both fields are required.");
      return;
    }

    setSubmit(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be signed in to create a post.");
        return;
      }

      const response = await fetch("https://prompt-hub-sigma.vercel.app/api/prompt/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: userID,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Your post has been created.");
        navigation.navigate("/");
      } else {
        Alert.alert("Error", "Failed to create the post. Try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Try again later.");
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submit={submit}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePost;
