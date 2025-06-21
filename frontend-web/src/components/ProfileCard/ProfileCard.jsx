import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import "./ProfileCard.css";
import placeholder from "../../assets/images/avatar-placeholder.png";

export default function ProfileCard() {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile]   = useState(null);
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const handleUpload = async () => {
    if (!file) return;
    setSaving(true);

    try {
      
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);

      
      const url = await getDownloadURL(storageRef);

      
      await updateProfile(auth.currentUser, { photoURL: url });

      
      await setDoc(
        doc(db, "users", user.uid),
        { avatarUrl: url },
        { merge: true }
      );

      
      setUser({ ...user, avatarUrl: url });

    } catch (err) {
      console.error(err);
      alert("Upload failed 😢");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-card">
      <img
  className="avatar-lg"
  src={user.avatarUrl || placeholder}
  alt="profile"
/>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button disabled={!file || saving} onClick={handleUpload}>
        {saving ? "Uploading…" : "Upload new photo"}
      </button>
    </div>
  );
}
