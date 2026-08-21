import { Link, useParams } from "react-router-dom";
import { STATUS_STYLES, IDEA_STATUS, formatDate } from "../constants";

export default function IdeaDetailPage({ ideas, loading, currentUserId, onVote, bookmarked, onToggleBookmark }) {
  const { id } = useParams();
  const idea = ideas.find((i) => i._id === id);

  if (loading) return <p className="mx-auto max-w-6xl px-5 py-20 text-center text-neutral-400">Loading...</p>;

  if (!idea) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-20 text-center">
        <p className="text-neutral-300 font-medium">Idea not found</p>
        <Link to="/ideas" className="mt-3 inline-block text-accent-400 hover:underline">
          Back to feed
        </Link>
      </main>
    );
  }

  const voted = currentUserId ? (idea.votes || []).some((v) => String(v) === String(currentUserId)) : false;
  const editable = currentUserId && idea.user === currentUserId;
  const currentStatusIndex = IDEA_STATUS.indexOf(idea.status);

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <Link to="/ideas" className="text-sm text-neutral-400 hover:text-neutral-100">
        ‹ Back to feed
      </Link>

      <article className="mt-5 rounded-xl border border-neutral-800 bg-ink-200 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-300">
            {idea.domain}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleBookmark(idea._id)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
                bookmarked ? "border-accent-500/60 bg-accent-500/10 text-accent-300" : "border-neutral-700 text-neutral-400 hover:border-accent-400"
              }`}
            >
              {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
            </button>
            <button
              onClick={() => onVote(idea)}
              disabled={!currentUserId || voted}
              className={`rounded-md border px-3 py-1.5 text-sm font-semibold ${
                voted ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300 cursor-default" : currentUserId ? "border-accent-500/60 bg-accent-500/10 text-accent-400 hover:bg-accent-500/20" : "border-neutral-700 text-neutral-400"
              }`}
            >
              {voted ? `✓ Voted · ${idea.voteCount}` : `▲ Vote · ${idea.voteCount}`}
            </button>
            {editable && (
              <Link to={`/edit/${idea._id}`} className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:border-accent-400">
                Edit
              </Link>
            )}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-50">{idea.title}</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {idea.submittedBy} · {formatDate(idea.createdAt)}
        </p>

        <div className="mt-6 grid gap-6">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Problem statement</h3>
            <p className="mt-1 text-neutral-200 leading-relaxed">{idea.problemStatement}</p>
          </div>
          {idea.description && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Description</h3>
              <p className="mt-1 text-neutral-200 leading-relaxed">{idea.description}</p>
            </div>
          )}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Expected impact</h3>
            <p className="mt-1 text-accent-200 leading-relaxed">{idea.expectedImpact}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-medium">Technologies</h3>
            <p className="mt-1 text-accent-300 font-medium">{idea.technologies}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-800 pt-6">
          <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">
            Idea lifecycle
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {IDEA_STATUS.map((s, idx) => (
              <span key={s} className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    idx <= currentStatusIndex
                      ? STATUS_STYLES[s]
                      : "border-neutral-800 bg-ink-100 text-neutral-600"
                  }`}
                >
                  {s}
                </span>
                {idx < IDEA_STATUS.length - 1 && <span className="text-neutral-700">→</span>}
              </span>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}