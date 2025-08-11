import { useState } from "react";
import axios from "axios";
import  "./AddCountry.css";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export default function AddCountry() {
  const [formData, setFormData] = useState({
    countryName: "",
    slug: "",
    intro: "",
    history: "",
    flagUrl: "",
  });

  const [flagImage, setFlagImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setFlagImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setUploading(true);

      // 1) Upload image to Firebase Storage
      let flagUrl = "";
      if (flagImage) {
        const storageRef = ref(storage, `flags/${Date.now()}-${flagImage.name}`);
        await uploadBytes(storageRef, flagImage);
        flagUrl = await getDownloadURL(storageRef);
      }


      // 2) Send data + image URL to Mongo backend
      const payload = { ...formData, flagUrl };
      const response = await axios.post( "http://localhost:4000/api/countries", payload);

      alert(`Country "${formData.countryName}" added successfully!`);
      console.log("Country added: ", response.data);

      // 3) Reset form
      setFormData({ countryName: "", slug: "", intro: "", history: "" });
      setFlagImage(null);
    
    } catch (err) {
      console.error("Error adding country: ", err.response?.data || err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pageWrapper">
     <form className="formContainer" onSubmit={handleSubmit}>
        <input
          name="countryName"
          value={formData.countryName}
          onChange={handleChange}
          placeholder="Country Name"
        />
        <input
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="Slug (e.g. samoa)"
        />
        <input
          name="intro"
          value={formData.intro}
          onChange={handleChange}
          placeholder="Short Intro"
        />
        <textarea
          name="history"
          value={formData.history}
          onChange={handleChange}
          placeholder="History"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit" disabled={uploading}>
          { uploading ? "Uploading..." : "Add Country" }
        </button>
      </form>
    </div>
  );
}
