import { usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { StyleSheet, View } from "react-native";

import { strings } from "@/i18n";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const tabs = [
  { label: strings.tabHome, href: "/" as const },
  { label: strings.tabStatistics, href: "/statistics" as const },
];

export default function AppTabs() {
  const pathname = usePathname();
  const activePath = pathname?.split("?")[0] ?? "/";

  return (
    <View style={styles.container}>
      <Tabs style={styles.tabs}>
        <TabSlot style={styles.tabSlot} />
        <TabList style={styles.tabList}>
          {tabs.map((tab) => {
            const isActive = activePath === tab.href;
            return (
              <TabTrigger
                key={tab.href}
                name={tab.href === "/" ? "index" : "statistics"}
                href={tab.href}
                style={styles.tabTrigger}
              >
                <ThemedView
                  type={isActive ? "backgroundSelected" : "backgroundElement"}
                  style={styles.tabButton}
                >
                  <ThemedText
                    type="smallBold"
                    themeColor={isActive ? "text" : "textSecondary"}
                  >
                    {tab.label}
                  </ThemedText>
                </ThemedView>
              </TabTrigger>
            );
          })}
        </TabList>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flex: 1,
  },
  tabSlot: {
    flex: 1,
  },
  tabList: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    backgroundColor: "#F0F0F3",
  },
  tabTrigger: {
    flex: 1,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
});
