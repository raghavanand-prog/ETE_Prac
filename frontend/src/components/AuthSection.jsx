import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

export default function AuthSection({ onAuth }) {
  const [mode, setMode] = useState("login");

  return (
    <div className="rounded-xl border border-neutral-800 bg-ink-200 p-6">
      <h2 className="text-xl font-bold text-neutral-50 mb-1">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h2>
      <p className="text-sm text-neutral-400 mb-5">
        {mode === "login"
          ? "Login to submit and manage your ideas."
          : "Sign up to start sharing your innovations."}
      </p>

      {mode === "login" ? (
        <Login onAuth={onAuth} onSwitch={() => setMode("register")} />
      ) : (
        <Register onAuth={onAuth} onSwitch={() => setMode("login")} />
      )}
    </div>
  );
}