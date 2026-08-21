import { useState } from "react";
import API from "../api";

export default function Login({ onAuth, onSwitch }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.email) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email address";
    if (!form.password) return "Password is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = validate();
    setError(check);
    if (check) return;
    setBusy(true);
    try {
      const res = await API.post("/auth/login", form);
      onAuth(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const field = "w-full rounded-md border border-neutral-700 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent-500";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="block text-sm mb-1 text-neutral-300">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@campus.edu"
          className={field}
        />
      </div>
      <div>
        <label className="block text-sm mb-1 text-neutral-300">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={field}
        />
      </div>

      {error && <p className="text-sm text-red-400 font-medium">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="rounded-md bg-accent-500 px-4 py-2.5 font-semibold text-neutral-900 hover:bg-accent-300 disabled:opacity-60"
      >
        {busy ? "Signing in..." : "Login"}
      </button>

      <p className="text-sm text-neutral-400">
        New here?{" "}
        <button type="button" onClick={onSwitch} className="text-accent-400 font-medium hover:underline">
          Register an account
        </button>
      </p>
    </form>
  );
}