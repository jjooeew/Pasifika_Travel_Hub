// frontend-web/src/pages/ThingsToDoPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../components/context/AuthContext";

import CountryActivities from "../components/CountryActivities/CountryActivities";
import { getCountry, listActivities, deleteActivity } from "../services/api";
import "./ThingstodoPage.css";

export default function ThingsToDoPage() {
  // Route should be /countries/:slug/things-to-do
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [country, setCountry] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCountry() {
      try {
        const res = await getCountry(slug);
        // backend returns { country }
        if (isMounted) setCountry(res.data.country || res.data);
      } catch (e) {
        console.error(e);
        if (isMounted) setCountry(null);
      }
    }
    loadCountry();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Load activities for this country
  useEffect(() => {
    let isMounted = true;
    async function loadActivities() {
      setLoading(true);
      try {
        const res = await listActivities(slug);
        // backend returns { activities }
        if (isMounted) setActivities(res.data.activities || []);
      } catch (e) {
        console.error(e);
        if (isMounted) setActivities([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadActivities();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Admin: delete an activity (new endpoint uses id only)
  const handleDelete = async (activityId) => {
    try {
      await deleteActivity(activityId);
      setActivities((prev) => prev.filter((a) => a._id !== activityId));
    } catch (err) {
      console.error("Failed to delete activity:", err);
      alert("Sorry, something went wrong.");
    }
  };

  return (
    <div className="page-layout">
      {/* Country sidebar removed for MVP; layout classes retained */}

      <div className="main-content">
        {loading ? (
          <p>Loading activities…</p>
        ) : (
          <>
            <div className="country-header">
              <h1>{country?.countryName || slug}</h1>
              <p>{country?.intro || "Explore the best things to do."}</p>
            </div>

            <CountryActivities
              activities={activities}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
}
