import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/ideas", label: "Records" },
  { to: "/about", label: "About" }
];

const navClass = ({ isActive }) =>
  isActive
    ? "text-accent-400 font-medium"
    : "text-neutral-400 hover:text-neutral-100";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-neutral-800 bg-ink-100/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-base font-bold tracking-tight text-neutral-50">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent-500" />
          <span>Innovation Hub</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/submit" className="hidden md:inline rounded-md bg-accent-500 px-3 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-accent-300">
                + Submit
              </Link>
              <span className="hidden md:inline text-sm text-neutral-400">
                Hi, <span className="text-neutral-100 font-medium">{user.name}</span>
              </span>
              <button
                onClick={onLogout}
                className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm font-medium text-neutral-300 hover:text-neutral-100 hover:border-accent-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/" className="rounded-md bg-accent-500 px-4 py-1.5 text-sm font-semibold text-neutral-900 hover:bg-accent-300">
              Login
            </Link>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-neutral-100 text-xl leading-none"
            aria-label="Menu"
          >
            &#9776;
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-800 bg-ink-100 px-5 py-3 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-left text-sm text-neutral-300 py-1"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link to="/submit" onClick={() => setOpen(false)} className="text-left text-sm text-accent-300 py-1">
              + Submit idea
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}