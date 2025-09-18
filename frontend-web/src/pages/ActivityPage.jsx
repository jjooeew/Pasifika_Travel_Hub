import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicActivity } from "../services/api";

export default function ActivityPage() {
  const { id } = useParams(); 
  const [activity, setActivity] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getPublicActivity(id)
      .then(({ data }) => {
        console.log("[ActivityPage] response: ", data);
        if (!mounted) return;
        setActivity(data || null);
        setError("")
      })
      .catch((e) => {
        setError(e?.response?.data?.error || "Not found");
        setActivity(null);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!activity) return <div className="p-6">Activity not found</div>;

  return (
    <div className="container">
        <h1>{activity.title}</h1>
        <img src={activity.imageUrl}/>
    </div>
  );
}
