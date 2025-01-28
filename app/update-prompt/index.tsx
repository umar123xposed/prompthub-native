import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Form from "../../components/Form"; 

const UpdatePrompt = () => {
  const router = useRouter();
  const { id: promptId } = useLocalSearchParams();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        if (!promptId) {
          Alert.alert("Error", "Prompt ID not found!");
          return;
        }

        const response = await fetch(`https://prompt-hub-sigma.vercel.app/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details");
        }

        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to load prompt details");
      } finally {
        setLoading(false);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async () => {
    if (!promptId) {
      Alert.alert("Error", "Prompt ID not found!");
      return;
    }

    if (!post.prompt || !post.tag) {
      Alert.alert("Error", "Both fields are required!");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`https://prompt-hub-sigma.vercel.app/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the prompt");
      }

      Alert.alert("Success", "Prompt updated successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update the prompt");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </View>
  );
};

export default UpdatePrompt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
