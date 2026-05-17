import {
  addDoc,
  collection as collectionRef,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "@/firebase";
import type { Collection, NewCollectionPayload } from "@/models/collection";
import { normalizeTags } from "@/models/collection";
import type { CollectionRepository } from "@/repositories/collection-repository";

const collectionsCollection = collectionRef(db, "collections");

export class FirestoreCollectionRepository implements CollectionRepository {
  async saveCollection(collection: NewCollectionPayload): Promise<void> {
    console.log("[DAO] Attempting to save collection:", collection.title);
    try {
      const docRef = await addDoc(collectionsCollection, {
        ...collection,
        createdAt: serverTimestamp(),
      });
      console.log("[DAO] Collection saved successfully with ID:", docRef.id);
    } catch (error) {
      console.error("[DAO] Error in saveCollection:", error);
      // Re-throw to let the UI handle the error message
      throw error;
    }
  }

  async loadOwnedCollections(owner: string): Promise<Collection[]> {
    const ownedCollectionsQuery = query(
      collectionsCollection,
      where("owner", "==", owner),
    );
    const snapshot = await getDocs(ownedCollectionsQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as Record<string, unknown>;
      const tagsArray = normalizeTags(
        data.tags as string | string[] | null | undefined,
      );

      return {
        id: doc.id,
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        owner: String(data.owner ?? owner),
        image: String(data.image ?? ""),
        category: String(data.category ?? ""),
        tags: tagsArray,
        itemCount: Number(data.itemCount ?? 0),
      };
    });
  }
}

export const firestoreCollectionRepository =
  new FirestoreCollectionRepository();
