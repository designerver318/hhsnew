"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const password = e.target.password.value;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: username.trim(),
        password,
        callbackUrl: "/admin",
      });

      console.log("Login Attempt →", { username: username.trim(), password });

      if (res?.error) {
        console.error("❌ Login failed:", res.error);
        setError("Invalid admin credentials");
        e.target.password.value = "";
      } else {
        console.log("✅ Login success");
        router.push(res?.url || "/admin");
      }
    } catch (err) {
      console.error("❌ Unexpected error during login:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorParam === "CredentialsSignin") {
      setError("Invalid admin credentials");
    }
  }, [errorParam]);

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Admin Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded text-black"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full p-2 border rounded text-black"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-blue-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
