import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { CollectionList } from "@/components/collection-list";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ThemedView } from "@/components/themed-view";
import { useOwnedCollections } from "@/hooks/use-collections";

const CURRENT_USER = "John Doe";

export default function HomeScreen() {
  const router = useRouter();
  const { collections } = useOwnedCollections(CURRENT_USER);

  const handleCreateCollection = () => {
    router.push("/create");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <CollectionList collections={collections} />
      </View>
      <FloatingActionButton onPress={handleCreateCollection} />
    </ThemedView>
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
