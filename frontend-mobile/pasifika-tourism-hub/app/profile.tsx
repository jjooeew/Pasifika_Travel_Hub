import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { getFirebaseAuth } from '../services/auth';
import { updateProfile, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../services/firebase';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../components/context/useAuth';
import ScreenWrapper from '../layouts/ScreenWrapper';
import PostFeed from '@/components/PostFeed';

const { width: screenWidth } = Dimensions.get('window');
const CARD_BG = '#F5E0C3';
const PRIMARY = '#0B5968';

export default function ProfilePage() {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.displayName || '');
  const [savingUsername, setSavingUsername] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);

  if (!user) {
    return (
      <ScreenWrapper>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading user...</Text>
      </ScreenWrapper>
    );
  }

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      uploadAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (uri: string) => {
    try {
      setSavingAvatar(true);

      // Convert image to blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Upload to Firebase Storage
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, blob);

      // Get public URL
      const url = await getDownloadURL(storageRef);

      // Update Auth and Firestore
      const auth = getFirebaseAuth();
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: url });
        await setDoc(doc(db, "users", user.uid), { avatarUrl: url }, { merge: true });
        Alert.alert("Success", "Avatar updated!");
      } else {
        Alert.alert("Error", "No user is currently signed in.");
      }

    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to upload avatar.");
    } finally {
      setSavingAvatar(false);
    }
  };

  const saveUsername = async () => {
    const newName = username.trim();
    if (!newName || newName === user.displayName) return;
    try {
      setSavingUsername(true);
      const auth = getFirebaseAuth();
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newName });
        await setDoc(doc(db, "users", user.uid), { username: newName }, { merge: true });
        Alert.alert("Success", "Username updated!");
      } else {
        Alert.alert("Error", "No user is currently signed in.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update username.");
    } finally {
      setSavingUsername(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.card}>
        {/* Profile Image */}
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            source={
              user.photoURL
                ? { uri: user.photoURL }
                : require('../assets/images/react-logo.png')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          onBlur={saveUsername}
          placeholder="Username"
          placeholderTextColor="#999"
        />

        {/* Email Display */}
        <TextInput
          style={[styles.input, styles.inputSpacing]}
          value={user.email || ''}
          editable={false}
          placeholder="Email"
          placeholderTextColor="#999"
        />

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handlePickImage}
          disabled={savingAvatar}
        >
          <Text style={styles.buttonText}>
            {savingAvatar ? "Uploading..." : "Change Photo"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.experiencesTitle}>My Experiences</Text>

      {/* Experiences Placeholder */}
      <PostFeed />
    </ScreenWrapper>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    width: screenWidth * 0.9,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputSpacing: {
    marginTop: 12,
  },
  experiencesTitle: {
    fontFamily: 'ComingSoon',
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 16,
    color: PRIMARY,
  },
  experienceBox: {
    width: screenWidth * 0.9,
    height: 200,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: '#8B4513', 
    borderRadius: 8,
  },
  button: {

  },
  buttonText: {

  }
});
