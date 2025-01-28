import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { GlobalProvider } from '@/GlobalContext';

SplashScreen.preventAutoHideAsync();

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
    <ThemeProvider value={colorScheme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
      <View style={styles.container}>
        {/* Always show Nav */}
        <Nav />

        {/* Stack Navigation */}
        <View style={styles.screenContainer}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </View>

        {/* Footer */}
        <Footer />

        {/* Status Bar */}
        <StatusBar
          style={colorScheme === 'dark' ? 'light' : 'dark'}
          backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
        />
      </View>
    </ThemeProvider>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Matches the light/dark mode theme
    overflow: 'visible',  // Make sure dropdowns and other items overflow the container
  },
  screenContainer: {
    flex: 1,
    marginBottom: 60, // Leave space for the Footer at the bottom
  },
});
