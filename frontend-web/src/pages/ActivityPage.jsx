import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivity } from "../services/api";

export default function ActivityPage() {
  const { id } = useParams(); 
  const [activity, setActivity] = useState("")
         
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
        const res = await getActivity(id)
        setActivity(res.data)
    } catch (e) {
        console.error(e)
        setError(e?.response?.data?.message || e.message); 
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!activity) return <div className="p-6">Activity not found</div>;

  return (
    <div className="container">
        <h1>${activity.title}</h1>
    </div>
  );
}
