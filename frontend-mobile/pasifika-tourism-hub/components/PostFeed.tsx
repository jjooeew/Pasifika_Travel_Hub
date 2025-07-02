import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "./context/useAuth";
import { db, storage } from "../services/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
 

export default function PostFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [postText, setPostText] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Country state
  const [countryTag, setCountryTag] = useState<string>("");
  const [countryOptions, setCountryOptions] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchPosts();
    fetchCountries();
  }, [user]);

  const fetchCountries = async () => {
    try {
      const res = await api.get("/countries");
 

      setCountryOptions(res.data as any[]);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      if (!user) return;

      const q = query(
        collection(db, "posts"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const snapshot = await getDocs(q);
      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(userPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleAddPost = async () => {
    if (!postText.trim() || !countryTag) {
      Alert.alert("Please enter text and select a country.");
      return;
    }
    try {
      let imageUrl = null;

      if (imageUri) {
        // Convert image to blob
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload to Firebase Storage
        const storageRef = ref(storage, `posts/${user?.uid}/${Date.now()}.jpg`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "posts"), {
        userId: user?.uid,
        email: user?.email,
        content: postText,
        country: countryTag,
        imageUrl,
        timestamp: serverTimestamp(),
      });

      setPostText("");
      setCountryTag("");
      setImageUri(null);
      fetchPosts();
    } catch (err) {
      console.error("Error adding post:", err);
      Alert.alert("Failed to add post.");
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingPostId) return;
    try {
      await updateDoc(doc(db, "posts", editingPostId), {
        content: editText,
      });
      setEditingPostId(null);
      setEditText("");
      fetchPosts();
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow photo access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <FlatList
  ListHeaderComponent={
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Share your experience..."
        value={postText}
        onChangeText={setPostText}
        style={styles.textInput}
      />
      <Picker
        selectedValue={countryTag}
        onValueChange={(value: string) => setCountryTag(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select a country..." value="" />
        {countryOptions.map((c) => (
          <Picker.Item key={c._id} label={c.countryName} value={c.countryName} />
        ))}
      </Picker>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 200, marginTop: 8 }}
        />
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddPost}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  }
  data={posts}
  keyExtractor={(item) => item.id}
  contentContainerStyle={styles.container}
  renderItem={({ item }) => (
    <View style={styles.postCard}>
      {item.country && (
        <Text style={styles.countryText}>📍 {item.country}</Text>
      )}
      {item.imageUrl && (
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: "100%", height: 200 }}
        />
      )}
      {editingPostId === item.id ? (
        <>
          <TextInput
            value={editText}
            onChangeText={setEditText}
            style={styles.textInput}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSaveEdit}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditingPostId(null)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text>{item.content}</Text>
          <Text style={styles.timestamp}>
            {item.timestamp?.toDate
              ? item.timestamp.toDate().toLocaleString()
              : ""}
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEditingPostId(item.id);
                setEditText(item.content);
              }}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDeletePost(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )}
/>

  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  inputContainer: { marginBottom: 16 },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  picker: {
    marginTop: 8,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#0B5968",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: { color: "#fff" },
  postCard: {
    backgroundColor: "#F5E0C3",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  countryText: { fontWeight: "bold", marginBottom: 4 },
  timestamp: { fontSize: 12, color: "#555", marginTop: 4 },
});
