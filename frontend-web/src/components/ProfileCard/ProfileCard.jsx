import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { auth, db, storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import "./ProfileCard.css";

export default function ProfileCard() {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile]   = useState(null);
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const handleUpload = async () => {
    if (!file) return;
    setSaving(true);

    try {
      // 1️⃣  push to Storage (avatars/{uid})
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);

      // 2️⃣  grab a public URL
      const url = await getDownloadURL(storageRef);

      // 3️⃣  update Firebase Auth profile (handy everywhere)
      await updateProfile(auth.currentUser, { photoURL: url });

      // 4️⃣  persist in Firestore users collection
      await setDoc(
        doc(db, "users", user.uid),
        { avatarUrl: url },
        { merge: true }
      );

      // 5️⃣  refresh local context
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
        src={user.avatarUrl || user.photoURL || "/images/avatar-placeholder.png"}
        alt="profile"
      />
      {/* …username / email UI exactly as before… */}

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
