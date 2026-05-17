export interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  owner: string;
  image: string;
  category: string;
  tags: string[];
}

export type NewCollectionPayload = Omit<Collection, "id">;

export function normalizeTags(rawTags: string | string[] | null | undefined): string[] {
  if (Array.isArray(rawTags)) {
    return rawTags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (!rawTags) {
    return [];
  }

  return String(rawTags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function isValidNewCollection(collection: NewCollectionPayload): boolean {
  return [
    collection.title,
    collection.description,
    collection.owner,
    collection.image,
    collection.category,
  ].every((value) => value.trim().length > 0) && collection.tags.length > 0;
}
