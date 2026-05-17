import { FlatList, StyleSheet } from "react-native";

import { strings } from "@/i18n";
import type { Collection } from "@/models/collection";
import { CollectionCard } from "./collection-card";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export interface CollectionListProps {
  collections: Collection[];
}

export function CollectionList({ collections }: CollectionListProps) {
  if (collections.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText
          type="subtitle"
          themeColor="textSecondary"
          style={styles.emptyText}
        >
          {strings.noCollections}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={collections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <CollectionCard collection={item} />}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 8,
  },
  emptyHint: {
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 100,
  },
});
