import { useState } from "react";
import "./AddCountry.css";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { createCountry } from "../services/api";

const slugify = (s) =>
  (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

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
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const {name, value } = e.target;
    if (name === "countryName") {
        setFormData((p) => { 
          const next = { ...p, countryName: value }; 
          // If slug still matches the previous auth generated slug, keep auto updating
          if (p.slug === slugify(p.countryName)) {
              next.slug = slugify(value)
          }
          return next;
        });

    } else if (name === "slug") {
      // If user is editing slug manually, normalise it but stop auto-update
        setFormData((p) => ({ ...p, slug: slugify(value) }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleFileChange = (e) => setFlagImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUploading(true);

    try {
      // 1) Upload image to Firebase Storage
      let flagUrl = "";
      if (flagImage) {
        const storageRef = ref(
          storage,
          `flags/${Date.now()}-${flagImage.name}`
        );
        await uploadBytes(storageRef, flagImage);
        flagUrl = await getDownloadURL(storageRef);
      }

      // 2) Build payload in the shape the backend expects
      const payload = {
        countryName: formData.countryName,
        slug: formData.slug || slugify(formData.countryName),
        intro: formData.intro,
        history: formData.history,
        flagUrl,
      };

      // 3) Use the api helper so the Authorisation header is attached
      const res = await createCountry(payload);


      alert(`Country "${formData.countryName}" added successfully!`);
      console.log("Country added: ", res.data);

      // 3) Reset form
      setFormData({ countryName: "", slug: "", intro: "", history: "" });
      setFlagImage(null);
    } catch (err) {
      console.error(
        "Error adding country: ",
        err.res?.data || err.message
      );
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Country"}
        </button>
      </form>
    </div>
  );
}
