import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Spacing } from "@/constants/theme";
import { strings } from "@/i18n";
import { firestoreCollectionRepository } from "@/repositories/firestore-collection-repository";

const CURRENT_USER = "John Doe";

export default function CreateCollectionScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    image: "",
  });

  const handleSave = async () => {
    if (!form.title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    console.log("Save button pressed. Starting submission...");
    setIsSubmitting(true);

    try {
      // Map UI form to NewCollectionPayload model
      await firestoreCollectionRepository.saveCollection({
        title: form.title,
        description: form.description,
        category: form.category,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        image: form.image,
        owner: CURRENT_USER,
        itemCount: 0,
      });

      Alert.alert("Success", strings.collectionSavedSuccess);
      router.back();
    } catch (error) {
      console.error("Error saving collection:", error);
      Alert.alert("Error", strings.collectionSaveFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="subtitle" style={styles.title}>
          {strings.createCollectionFormTitle}
        </ThemedText>

        <ThemedText style={styles.label}>
          {strings.createCollectionTitleLabel}
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.light.textSecondary}
          value={form.title}
          onChangeText={(title) => setForm((prev) => ({ ...prev, title }))}
        />

        <ThemedText style={styles.label}>
          {strings.createCollectionDescriptionLabel}
        </ThemedText>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholderTextColor={Colors.light.textSecondary}
          multiline
          numberOfLines={4}
          value={form.description}
          onChangeText={(description) =>
            setForm((prev) => ({ ...prev, description }))
          }
        />

        <ThemedText style={styles.label}>
          {strings.createCollectionCategoryLabel}
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder={strings.createCollectionCategoryPlaceholder}
          placeholderTextColor={Colors.light.textSecondary}
          value={form.category}
          onChangeText={(category) =>
            setForm((prev) => ({ ...prev, category }))
          }
        />

        <ThemedText style={styles.label}>
          {strings.createCollectionTagsLabel}
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder={strings.createCollectionTagsPlaceholder}
          placeholderTextColor={Colors.light.textSecondary}
          value={form.tags}
          onChangeText={(tags) => setForm((prev) => ({ ...prev, tags }))}
        />

        <ThemedText style={styles.label}>
          {strings.createCollectionImageLabel}
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="https://..."
          placeholderTextColor={Colors.light.textSecondary}
          value={form.image}
          onChangeText={(image) => setForm((prev) => ({ ...prev, image }))}
        />

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ThemedText style={styles.submitButtonText}>
              {strings.createCollectionSubmit}
            </ThemedText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
  title: {
    marginBottom: Spacing.two,
  },
  label: {
    fontWeight: "600",
    marginBottom: Spacing.half,
  },
  input: {
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Spacing.one,
    padding: Spacing.two,
    color: Colors.light.text,
    fontSize: 16,
    marginBottom: Spacing.two,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#208AEF",
    padding: Spacing.three,
    borderRadius: Spacing.one,
    alignItems: "center",
    marginTop: Spacing.two,
    marginBottom: Spacing.six,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
