import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import type { Collection } from "@/models/collection";
import { collectionService } from "@/services/collection-service";

export function useOwnedCollections(owner: string) {
  const [collections, setCollections] = useState<Collection[]>([]);

  const refresh = useCallback(async () => {
    try {
      const ownedCollections = await collectionService.loadOwnedCollections(owner);
      setCollections(ownedCollections);
    } catch (error) {
      Alert.alert("Unable to load collections", String(error));
    }
  }, [owner]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    collections,
    refresh,
  };
}
