import IdeaFeed from "../components/IdeaFeed.jsx";

export default function IdeasPage({
  ideas,
  loading,
  error,
  currentUserId,
  onVote,
  onDelete,
  bookmarked,
  onToggleBookmark
}) {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-50">Idea Feed</h1>
        <p className="text-neutral-400 mt-2 max-w-2xl">
          Search, filter and sort every campus innovation. Combine filters, rank by votes, and
          bookmark ideas you want to follow.
        </p>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-ink-200 p-6">
        <IdeaFeed
          ideas={ideas}
          loading={loading}
          error={error}
          currentUserId={currentUserId}
          onVote={onVote}
          onDelete={onDelete}
          bookmarked={bookmarked}
          onToggleBookmark={onToggleBookmark}
        />
      </div>
    </main>
  );
}