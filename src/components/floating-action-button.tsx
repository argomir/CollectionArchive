import { Pressable, StyleSheet } from "react-native";

import { BottomTabInset } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { strings } from "@/i18n";
import { ThemedText } from "./themed-text";

export interface FloatingActionButtonProps {
  onPress: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: "#208AEF",
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      onPress={onPress}
      accessible
      accessibilityLabel={strings.createNewCollection}
      accessibilityRole="button"
    >
      <ThemedText style={styles.buttonText}>+</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: BottomTabInset - 56,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "300",
    color: "#FFFFFF",
  },
});
