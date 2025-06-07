"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements");
      if (!res.ok) throw new Error("Failed to fetch announcements");
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#bf213e] mb-6">📢 Announcements</h1>

      {loading && <p>Loading announcements...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4"
          >
            <h2 className="text-lg font-semibold text-[#bf213e]">{item.title}</h2>
            <p className="text-gray-700 mt-1">{item.message}</p>
            <p className="text-sm text-gray-500 italic mt-2">
              {item.date ? format(new Date(item.date), "MMMM d, yyyy") : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
