"use client";
import { useState } from "react";

export default function AddAchiever() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    result: "",
    subject: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/achievers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      alert(`🎉 Achiever added! ID: ${data.data._id}`);
      setForm({ name: "", image: "", result: "", subject: "", description: "" });
      setImagePreview("");
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to add achiever");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 space-y-6 max-w-2xl bg-white text-gray-800 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bol text-[#bf213e]">🎖️ Add New Achiever</h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Image Upload */}
      <div className="w-full">
        <label
          htmlFor="imageUpload"
          className="flex flex-col items-center justify-center w-full h-32 p-4 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:border-[#bf213e] transition"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full object-contain rounded"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-1h6v1a1 1 0 01-1 1z"
                />
              </svg>
              <p className="text-sm">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
            </div>
          )}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        value={form.name}
        className="w-full p-3 rounded border border-gray-300 bg-white text-gray-800 focus:outline-[#bf213e]"
        required
      />

      {/* Result */}
      <input
        type="text"
        name="result"
        placeholder="Result (e.g., 95%)"
        onChange={handleChange}
        value={form.result}
        className="w-full p-3 rounded border border-gray-300 bg-white text-gray-800"
        required
      />

      {/* Subject */}
      <input
        type="text"
        name="subject"
        placeholder="Subject (e.g., Math)"
        onChange={handleChange}
        value={form.subject}
        className="w-full p-3 rounded border border-gray-300 bg-white text-gray-800"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded font-semibold text-white ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#bf213e] hover:bg-[#a01b33]"
        }`}
      >
        {isSubmitting ? "Adding..." : "Add Achiever"}
      </button>
    </form>
  );
}
