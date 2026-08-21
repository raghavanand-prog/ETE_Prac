import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import API from "./api.js";
import Navbar from "./components/Navbar.jsx";
import About from "./components/About.jsx";
import HomePage from "./pages/HomePage.jsx";
import IdeasPage from "./pages/IdeasPage.jsx";
import IdeaDetailPage from "./pages/IdeaDetailPage.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";
import EditPage from "./pages/EditPage.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState("");
  const [bookmarked, setBookmarked] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("bookmarks") || "[]"));
    } catch {
      return new Set();
    }
  });
  const navigate = useNavigate();

  // Restore session + load ideas once at start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const saved = localStorage.getItem("user");
    if (token && saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    fetchIdeas();
    // eslint-disable-next-line
  }, []);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await API.get("/idea");
      setIdeas(res.data);
      setFeedError("");
    } catch (err) {
      setFeedError(err.response?.data?.message || "Failed to load ideas. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSave = async (data, id) => {
    try {
      if (id) await API.put(`/idea/${id}`, data);
      else await API.post("/idea", data);
      await fetchIdeas();
      return true;
    } catch (err) {
      setFeedError(err.response?.data?.message || "Could not save the idea.");
      return false;
    }
  };

  const handleDelete = async (idea) => {
    if (!window.confirm(`Delete the idea "${idea.title}"?`)) return;
    try {
      await API.delete(`/idea/${idea._id}`);
      await fetchIdeas();
    } catch (err) {
      setFeedError(err.response?.data?.message || "Could not delete the idea.");
    }
  };

  const handleVote = async (idea) => {
    try {
      const res = await API.put(`/idea/${idea._id}/vote`, {});
      setIdeas((prev) => prev.map((i) => (i._id === res.data._id ? res.data : i)));
      setFeedError("");
    } catch (err) {
      setFeedError(err.response?.data?.message || "Could not vote.");
    }
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("bookmarks", JSON.stringify([...next]));
      return next;
    });
  };

  const sharedFeedProps = {
    ideas,
    loading,
    currentUserId: user?._id,
    onVote: handleVote,
    onDelete: handleDelete,
    bookmarked,
    onToggleBookmark: toggleBookmark
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage {...sharedFeedProps} user={user} onAuth={handleAuth} />} />
          <Route path="/ideas" element={<IdeasPage {...sharedFeedProps} error={feedError} />} />
          <Route path="/ideas/:id" element={<IdeaDetailPage {...sharedFeedProps} />} />
          <Route path="/submit" element={<SubmitPage user={user} onSave={(d) => handleSave(d)} />} />
          <Route
            path="/edit/:id"
            element={<EditPage ideas={ideas} loading={loading} user={user} onSave={handleSave} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <footer className="mt-10 border-t border-neutral-800 bg-ink-100 py-8">
        <div className="mx-auto max-w-6xl px-5 text-center text-sm text-neutral-500">
          Campus Idea &amp; Innovation Hub &middot; MERN stack practical application
        </div>
      </footer>
    </div>
  );
}
