import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import "../global.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { getItemAsync } from "expo-secure-store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const { authState, onLogout } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [loading, setloading] = useState(true);

  useEffect(() => {
    const inTabGroups = segments[0] === "(auth)";

    console.log(authState?.authenticated, "authenticate");

    if (authState?.authenticated) {
      router.replace("/(tabs)/");
      setloading(false);
    } else if (!authState?.authenticated) {
      router.replace("/(auth)/login");
      setloading(false);
    }
  }, [authState]);

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {loading ? (
          <Slot />
        ) : (
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(product)"
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "default",
                animationDuration: 5000,
              }}
            />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                animation: "slide_from_bottom",
              }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        )}
      </ThemeProvider>
    </AuthProvider>
  );
}
