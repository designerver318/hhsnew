"use client";
import { useState } from "react";

export default function AddAnnouncement() {
  const [form, setForm] = useState({ title: "", message: "", date: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      alert("✅ Announcement added!");
      setForm({ title: "", message: "", date: "" });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-2xl bg-white border border-gray-200 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-[#bf213e]">📢 Add New Announcement</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Announcement Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 border rounded text-gray-800"
        required
      />

      <textarea
        name="message"
        placeholder="Message"
        rows="4"
        value={form.message}
        onChange={handleChange}
        className="w-full p-3 border rounded text-gray-800"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-3 border rounded text-gray-800"
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#bf213e] text-white font-semibold py-2 px-4 rounded hover:bg-[#a01b33]"
      >
        {isSubmitting ? "Saving..." : "Add Announcement"}
      </button>
    </form>
  );
}
