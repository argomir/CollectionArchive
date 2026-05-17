import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppHeader from "@/components/app-header";
import AppTabs from "@/components/app-tabs";

export default function TabLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <View style={styles.container}>
        <AnimatedSplashOverlay />
        <AppHeader />
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="statistics" />
            <Stack.Screen name="create" options={{ presentation: "modal" }} />
          </Stack>
        </View>
        <AppTabs />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
