"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AchieversList() {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchAchievers();
  }, []);

  const fetchAchievers = async () => {
    try {
      const res = await fetch("/api/achievers");
      if (!res.ok) throw new Error("Failed to fetch achievers");
      const data = await res.json();
      setAchievers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this achiever?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/achievers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete achiever");

      // Refresh the list after deletion
      fetchAchievers();
    } catch (err) {
      alert("❌ Error deleting achiever: " + err.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#b12f3e] mb-4">🎓 Achievers List</h1>

      {loading && <p>Loading achievers...</p>}
      {error && <p className="text-[#b12f3e]">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4 border border-gray-400">Image</th>
                <th className="py-2 px-4 border border-gray-400">Name</th>
                <th className="py-2 px-4 border border-gray-400">Result</th>
                <th className="py-2 px-4 border border-gray-400">Subject</th>
                <th className="py-2 px-4 border border-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievers.map((achiever, index) => (
                <tr key={achiever._id} className="text-center text-black hover:bg-gray-100">
                  <td className="py-2 px-4 border border-gray-400">
                    {achiever.image ? (
                      <Image
                        src={achiever.image}
                        alt={achiever.name}
                        width={100}
                        height={100}
                        className="h-12 w-12 rounded-full object-cover"
                        unoptimized
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-2 px-4 border border-gray-400 capitalize">{achiever.name}</td>
                  <td className="py-2 px-4 border border-gray-400">{achiever.result}%</td>
                  <td className="py-2 px-4 border border-gray-400">{achiever.subject}</td>
                  <td className="py-2 px-4 border border-gray-400 space-x-2">
                    <button
                      onClick={() => router.push(`/admin/achievers/edit/${achiever._id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(achiever._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
