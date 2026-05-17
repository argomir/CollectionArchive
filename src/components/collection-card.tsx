import { Image, StyleSheet, View } from "react-native";

import { strings } from "@/i18n";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import type { Collection } from "@/models/collection";

export interface CollectionCardProps {
  collection: Collection;
  onPress?: () => void;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      {collection.image ? <Image source={{ uri: collection.image }} style={styles.image} /> : null}
      {collection.category ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.category}>
          {collection.category}
        </ThemedText>
      ) : null}
      <View style={styles.header}>
        <ThemedText type="smallBold" numberOfLines={1} style={styles.title}>
          {collection.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {collection.itemCount} {" "}
          {collection.itemCount === 1 ? strings.itemCount : strings.itemsCount}
        </ThemedText>
      </View>
      <ThemedText
        type="small"
        themeColor="textSecondary"
        numberOfLines={2}
        style={styles.description}
      >
        {collection.description}
      </ThemedText>
      {collection.tags.length ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.tags} numberOfLines={1}>
          {collection.tags.map((tag) => `#${tag}`).join(" ")}
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    gap: 8,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 16,
  },
  description: {
    lineHeight: 18,
  },
  owner: {
    marginTop: 4,
    fontSize: 12,
  },
  tags: {
    lineHeight: 20,
  },
  category: {
    marginBottom: 6,
    fontSize: 12,
    textTransform: "uppercase",
  },
});
