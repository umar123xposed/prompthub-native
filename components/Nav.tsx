import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Animated, Easing } from "react-native";
import { useRouter } from "expo-router";
import { auth, provider } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useGlobalContext } from "@/GlobalContext";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownAnimation] = useState(new Animated.Value(0)); // For controlling the animation
  const Router = useRouter();
  const {setID}= useGlobalContext()

  const fetchUserId = async (email: string | null) => {
    try {
      const response = await fetch(
        `https://prompt-hub-sigma.vercel.app/api/users/email?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUserId(data.id);
        setID(data.id)
      } else {
        console.error("Failed to fetch user ID:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email, displayName, photoURL } = currentUser;
        setUser({ email, displayName, photoURL });
        fetchUserId(email);
      } else {
        setUser(null);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserId(null);
      setDropdownVisible(false);
      Alert.alert("Signed Out", "You have been signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
    if (!dropdownVisible) {
      // Trigger the dropdown animation to drop in
      Animated.timing(dropdownAnimation, {
        toValue: 1, // Make the dropdown visible
        duration: 300, // Duration of the animation
        easing: Easing.ease, // Smooth easing
        useNativeDriver: true, // Improve performance
      }).start();
    } else {
      // Close the dropdown with animation
      Animated.timing(dropdownAnimation, {
        toValue: 0, // Make the dropdown invisible
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };

  const dropdownStyle = {
    opacity: dropdownAnimation,
    transform: [
      {
        translateY: dropdownAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0], // Move the dropdown from above when closing to the default position when opened
        }),
      },
    ],
  };

  const handleNavigateToProfile = () => {
    Router.push({ pathname: "/profile", params: { userId } });
    setDropdownVisible(false);
  };

  const handleCreatePost = () => {
    Router.push({ pathname: "/create-prompt", params: { userId } });
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/logo.svg")} style={styles.logo} />
        <Text style={styles.logoText}>PromptHub</Text>
      </View>

      {user ? (
        <View style={styles.authenticatedLinks}>
          <TouchableOpacity onPress={handleProfileClick} style={styles.profileButton}>
            <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
          </TouchableOpacity>

          {dropdownVisible && (
            <Animated.View style={[styles.dropdown, dropdownStyle]}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleNavigateToProfile}>
                <Text>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleCreatePost}>
                <Text>Create Post</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleSignOut}>
                <Text>Sign Out</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      ) : (
        <TouchableOpacity onPress={handleSignIn} style={styles.link}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    zIndex: 10,  // Ensure Nav is on top
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  authenticatedLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: -90,  // Adjust dropdown position relative to profile button
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 20,  // Ensure dropdown is above everything else
    width: 150,
    overflow: "visible",  // Ensure it doesn't get clipped by parent containers
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    textAlign: "center", // Centers the text horizontally
    justifyContent: "center", // Centers vertically (only if the height of the item is defined)
    alignItems: "center", // Ensures content is aligned properly if it's a flex container
    height: 40, // Optional, you can adjust this value for the vertical centering
  },
  link: {
    padding: 8,
    borderRadius: 4,
  },
});

export default Nav;
