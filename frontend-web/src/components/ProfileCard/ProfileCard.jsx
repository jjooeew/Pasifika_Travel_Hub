import { useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";

import { auth, storage, db } from "../../firebase";        
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import placeholder from "../../assets/images/avatar-placeholder.png";  
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
     
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);

    
      const url = await getDownloadURL(storageRef);

     
      await updateProfile(auth.currentUser, { photoURL: url });

     
      await setDoc(doc(db, "users", user.uid), { avatarUrl: url }, { merge: true });

      setUser({ ...user, avatarUrl: url });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed – please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-card">
     
      <img
        className="avatar-lg"
        src={user.avatarUrl || user.photoURL || placeholder}
        alt="profile"
      />

      <h2 className="card-heading">
        {user.displayName || user.username || "My Profile"}
      </h2>

   
      <div className="info-table">
        <div className="row">
          <span className="label">Username</span>
          <span className="value">{user.username || "—"}</span>
        </div>
        <div className="row">
          <span className="label">Email</span>
          <span className="value">{user.email || "—"}</span>
        </div>
      </div>

    
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        disabled={!file || saving}
        onClick={handleUpload}
      >
        {saving ? "Uploading…" : "Upload new photo"}
      </button>
    </div>
  );
}
