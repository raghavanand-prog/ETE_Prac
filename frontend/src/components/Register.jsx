import { useState } from "react";
import API from "../api";

export default function Register({ onAuth, onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    else if (form.name.trim().length < 3) err.name = "Name must be at least 3 characters";
    if (!form.email) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address";
    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checked = validate();
    setErrors(checked);
    if (Object.keys(checked).length) return;
    setBusy(true);
    try {
      const res = await API.post("/auth/register", form);
      onAuth(res.data);
    } catch (err) {
      setErrors({ server: err.response?.data?.message || "Registration failed. Try again." });
    } finally {
      setBusy(false);
    }
  };

  const field = (hasErr) =>
    `w-full rounded-md border ${hasErr ? "border-red-500" : "border-neutral-700"} bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent-500`;

  const errorText = (key) => errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>;

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="block text-sm mb-1 text-neutral-300">Full name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={field(errors.name)}
        />
        {errorText("name")}
      </div>
      <div>
        <label className="block text-sm mb-1 text-neutral-300">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@campus.edu"
          className={field(errors.email)}
        />
        {errorText("email")}
      </div>
      <div>
        <label className="block text-sm mb-1 text-neutral-300">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
          className={field(errors.password)}
        />
        {errorText("password")}
      </div>

      {errors.server && <p className="text-sm text-red-500 font-medium">{errors.server}</p>}

      <button
        type="submit"
        disabled={busy}
        className="rounded-lg bg-accent-500 px-4 py-2.5 font-semibold text-neutral-900 hover:bg-accent-300 disabled:opacity-60"
      >
        {busy ? "Creating account..." : "Register"}
      </button>

      <p className="text-sm text-neutral-400">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-accent-400 font-medium hover:underline">
          Login
        </button>
      </p>
    </form>
  );
}