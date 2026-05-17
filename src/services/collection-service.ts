import type { Collection, NewCollectionPayload } from "@/models/collection";
import type { CollectionRepository } from "@/repositories/collection-repository";
import { firestoreCollectionRepository } from "@/repositories/firestore-collection-repository";

export class CollectionService {
  constructor(private repository: CollectionRepository) {}

  loadOwnedCollections(owner: string): Promise<Collection[]> {
    return this.repository.loadOwnedCollections(owner);
  }

  saveCollection(collection: NewCollectionPayload): Promise<void> {
    return this.repository.saveCollection(collection);
  }
}

export const collectionService = new CollectionService(firestoreCollectionRepository);
