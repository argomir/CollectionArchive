import type { Collection, NewCollectionPayload } from "@/models/collection";

export interface CollectionRepository {
  loadOwnedCollections(owner: string): Promise<Collection[]>;
  saveCollection(collection: NewCollectionPayload): Promise<void>;
}
