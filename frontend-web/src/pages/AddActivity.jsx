import { useParams } from "react-router-dom";
import { useState } from "react";
import { addActivity } from "../services/api";
import "./AddCountry.css";      

export default function AddActivity() {
  const { slug } = useParams();   
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    liked: false,
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await addActivity(slug, formData)
      console.log("Activity added:", res.data);

      alert("Activity added successfully!");
    } catch (err) {
      console.error("Error adding activity:", err.response?.data || err.message);
      alert("Failed to add activity");
    }
  };


  return (
    <div className="pageWrapper">
      <form className="formContainer" onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Activity title"
          required
        />
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description"
        />
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}
