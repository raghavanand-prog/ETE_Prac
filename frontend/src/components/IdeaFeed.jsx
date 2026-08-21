import { useMemo, useState } from "react";
import IdeaCard from "./IdeaCard.jsx";
import { DOMAIN_OPTIONS, IDEA_STATUS } from "../constants";

const PAGE_SIZE = 6;

const selectClass =
  "rounded-md border border-neutral-700 bg-ink-300 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent-500";

export default function IdeaFeed({
  ideas,
  loading,
  error,
  currentUserId,
  onVote,
  onDelete,
  bookmarked,
  onToggleBookmark
}) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [page, setPage] = useState(1);

  // Search -> Filter -> Sort -> Paginate
  const result = useMemo(() => {
    const q = search.trim().toLowerCase();

    const searched = ideas.filter((idea) => {
      if (!q) return true;
      return (
        idea.title.toLowerCase().includes(q) ||
        idea.problemStatement.toLowerCase().includes(q) ||
        (idea.description || "").toLowerCase().includes(q) ||
        idea.technologies.toLowerCase().includes(q) ||
        idea.domain.toLowerCase().includes(q)
      );
    });

    const filtered = searched.filter((idea) => {
      const mDomain = !domain || idea.domain === domain;
      const mStatus = !status || idea.status === status;
      const mBook = !onlyBookmarked || bookmarked.has(idea._id);
      return mDomain && mStatus && mBook;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "votes") return (b.voteCount || 0) - (a.voteCount || 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sorted;
  }, [ideas, search, domain, status, sortBy, onlyBookmarked, bookmarked]);

  const pages = Math.max(1, Math.ceil(result.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const visible = result.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <section id="records">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-6">
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Search ideas</label>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
            placeholder="Search by title, problem, technology..."
            className="w-full rounded-md border border-neutral-700 bg-ink-300 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Domain</label>
          <select value={domain} onChange={(e) => { setDomain(e.target.value); resetPage(); }} className={selectClass}>
            <option value="">All domains</option>
            {DOMAIN_OPTIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Status</label>
          <select value={status} onChange={(e) => { setStatus(e.target.value); resetPage(); }} className={selectClass}>
            <option value="">All statuses</option>
            {IDEA_STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Sort by</label>
          <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); resetPage(); }} className={selectClass}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="votes">Highest votes</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-5">
        <p className="text-sm text-neutral-500">
          Showing <span className="text-neutral-100 font-medium">{result.length}</span> of{" "}
          <span className="text-neutral-100 font-medium">{ideas.length}</span> ideas
        </p>
        <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyBookmarked}
            onChange={(e) => { setOnlyBookmarked(e.target.checked); resetPage(); }}
            className="h-4 w-4 accent-accent-500"
          />
          Only bookmarked
        </label>
      </div>

      {loading ? (
        <p className="text-center py-16 text-neutral-400">Loading ideas...</p>
      ) : error ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-6 text-center text-red-400 font-medium">
          {error}
        </p>
      ) : result.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-700 py-16 text-center">
          <p className="text-neutral-300 font-medium">No ideas found</p>
          <p className="text-sm text-neutral-500 mt-1">Try a different search or clear the filters.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
              currentUserId={currentUserId}
              onVote={onVote}
              onDelete={onDelete}
              bookmarked={bookmarked.has(idea._id)}
              onToggleBookmark={onToggleBookmark}
              compact
            />
          ))}
        </div>
      )}
      {!loading && !error && result.length > PAGE_SIZE && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 disabled:opacity-40 hover:border-accent-400"
          >
            ‹ Prev
          </button>
          <span className="text-sm text-neutral-400">
            Page {safePage} of {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={safePage === pages}
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 disabled:opacity-40 hover:border-accent-400"
          >
            Next ›
          </button>
        </div>
      )}
    </section>
  );
}

