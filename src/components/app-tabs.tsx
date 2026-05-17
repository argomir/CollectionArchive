import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/theme";
import { strings } from "@/i18n";
import { ThemedText } from "./themed-text";

export default function AppTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const colors = Colors.light;

  const tabs = [
    {
      name: "home",
      label: strings.tabHome,
      icon: require("@/assets/images/tabIcons/home.png"),
      path: "/",
    },
    {
      name: "statistics",
      label: strings.tabStatistics,
      icon: require("@/assets/images/tabIcons/explore.png"),
      path: "/statistics",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Pressable
            key={tab.name}
            onPress={() => router.push(tab.path as any)}
            style={styles.tabItem}
          >
            <Image
              source={tab.icon}
              style={[
                styles.icon,
                { tintColor: isActive ? colors.text : colors.textSecondary },
              ]}
            />
            <ThemedText
              style={[
                styles.label,
                { color: isActive ? colors.text : colors.textSecondary },
              ]}
            >
              {tab.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
  },
});
