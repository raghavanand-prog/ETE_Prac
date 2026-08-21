import { Link } from "react-router-dom";
import { STATUS_STYLES, formatDate } from "../constants";

export default function IdeaCard({
  idea,
  currentUserId,
  onVote,
  onDelete,
  bookmarked,
  onToggleBookmark,
  compact = false
}) {
  const date = formatDate(idea.createdAt);
  const voted = currentUserId
    ? (idea.votes || []).some((v) => String(v) === String(currentUserId))
    : false;
  const editable = currentUserId && idea.user === currentUserId;

  return (
    <article className="flex flex-col rounded-xl border border-neutral-800 bg-ink-200 p-5 hover:border-neutral-700 transition">
      <div className="flex items-center justify-between gap-2 mb-4">
        <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-medium text-neutral-300">
          {idea.domain}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[idea.status] || STATUS_STYLES["Submitted"]}`}
        >
          {idea.status}
        </span>
      </div>

      <h3 className="text-lg font-bold leading-snug text-neutral-50">
        <Link to={`/ideas/${idea._id}`} className="hover:text-accent-300">
          {idea.title}
        </Link>
      </h3>

      <p className="mt-3 text-xs uppercase tracking-wider text-neutral-500 font-medium">
        Problem statement
      </p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-300">
        {compact && idea.problemStatement.length > 90
          ? idea.problemStatement.slice(0, 90) + "…"
          : idea.problemStatement}
      </p>

      {!compact && idea.description && (
        <>
          <p className="mt-4 text-xs uppercase tracking-wider text-neutral-500 font-medium">Description</p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-300">{idea.description}</p>
        </>
      )}

      {!compact && (
        <>
          <p className="mt-4 text-xs uppercase tracking-wider text-neutral-500 font-medium">
            Expected impact
          </p>
          <p className="mt-1 text-sm leading-relaxed text-accent-200">{idea.expectedImpact}</p>
        </>
      )}

      <p className="mt-4 text-xs uppercase tracking-wider text-neutral-500 font-medium">Technologies</p>
      <p className="mt-1 text-sm font-medium text-accent-300">{idea.technologies}</p>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-800 pt-4">
        <span className="text-xs text-neutral-500">
          {idea.submittedBy} · {date}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleBookmark(idea._id)}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
              bookmarked
                ? "border-accent-500/60 bg-accent-500/10 text-accent-300"
                : "border-neutral-700 text-neutral-400 hover:border-accent-400"
            }`}
            title="Bookmark"
          >
            {bookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </button>

          <button
            onClick={() => onVote(idea)}
            disabled={!currentUserId || voted}
            className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
              voted
                ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-300 cursor-default"
                : currentUserId
                ? "border-accent-500/60 bg-accent-500/10 text-accent-400 hover:bg-accent-500/20"
                : "border-neutral-700 text-neutral-400"
            }`}
          >
            {voted ? `✓ Voted · ${idea.voteCount}` : `▲ Vote · ${idea.voteCount}`}
          </button>

          <Link
            to={`/ideas/${idea._id}`}
            className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:border-accent-400"
          >
            View
          </Link>

          {editable && (
            <>
              <Link
                to={`/edit/${idea._id}`}
                className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs font-medium text-neutral-300 hover:border-accent-400"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(idea)}
                className="rounded-md border border-red-500/50 px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/10"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </footer>
    </article>
  );
}