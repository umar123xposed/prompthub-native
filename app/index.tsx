import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure the Root Layout is fully mounted before redirecting
    if (isMounted) {
      router.replace("/home");
    }
  }, [isMounted]);

  useEffect(() => {
    // Wait for the component to mount
    setIsMounted(true);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Show a loading indicator while redirecting */}
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
