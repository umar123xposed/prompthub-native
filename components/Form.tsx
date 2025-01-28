import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Form = ({ type, post, setPost, submit, handleSubmit }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{type} Prompt</Text>
      <Text style={styles.description}>
        Share your AI prompt and tag it for others to find.
      </Text>

      <Text style={styles.label}>Your AI Prompt</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Your prompt here..."
        value={post.prompt}
        onChangeText={(text) => setPost({ ...post, prompt: text })}
        multiline
      />

      <Text style={styles.label}>Tags</Text>
      <TextInput
        style={styles.input}
        placeholder="#web, #software, #AI"
        value={post.tag}
        onChangeText={(text) => setPost({ ...post, tag: text })}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={submit}
        >
          {submit ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>
              {submit ? `${type}...` : type}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 12,
    backgroundColor: "#ccc",
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "600",
  },
  submitButton: {
    padding: 12,
    backgroundColor: "#ff7f00",
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Form;
