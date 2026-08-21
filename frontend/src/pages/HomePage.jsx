import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import AuthSection from "../components/AuthSection.jsx";
import StatBar from "../components/StatBar.jsx";
import IdeaCard from "../components/IdeaCard.jsx";

export default function HomePage({
  user,
  onAuth,
  ideas,
  loading,
  currentUserId,
  onVote,
  onDelete,
  bookmarked,
  onToggleBookmark
}) {
  const recent = [...ideas].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  return (
    <main>
      <Header loggedIn={!!user} />

      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-8 md:grid-cols-2 items-start mb-12">
          <div>
            {user ? (
              <div className="rounded-xl border border-neutral-800 bg-ink-200 p-6">
                <h2 className="text-xl font-bold text-neutral-50">
                  Welcome back, {user.name}
                </h2>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  Ready to share a new idea or vote for the best campus innovations? Everything you
                  submit appears instantly on the live idea feed.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    to="/submit"
                    className="rounded-md bg-accent-500 px-4 py-2.5 font-semibold text-neutral-900 hover:bg-accent-300"
                  >
                    + Submit an idea
                  </Link>
                  <Link
                    to="/ideas"
                    className="rounded-md border border-neutral-700 px-4 py-2.5 font-medium text-neutral-300 hover:border-accent-400"
                  >
                    Browse the feed
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <AuthSection onAuth={onAuth} />
                <p className="mt-4 text-sm text-neutral-500">
                  The feed is browsable without an account &mdash; login only to submit ideas or vote.
                </p>
              </>
            )}
          </div>

          <div className="rounded-xl border border-neutral-800 bg-ink-200 p-6">
            <h2 className="text-xl font-bold text-neutral-50">live campus statistics</h2>
            <p className="text-sm text-neutral-500 mb-4">How innovation is growing on the hub</p>
            <StatBar ideas={ideas} />
          </div>
        </div>

        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-50">Recently submitted</h2>
            <p className="text-sm text-neutral-500 mt-1">
              {loading ? "Loading ideas..." : "Catch up on the latest ideas on the campus feed"}
            </p>
          </div>
          <Link to="/ideas" className="text-sm font-medium text-accent-400 hover:underline">
            View all ideas →
          </Link>
        </div>

        {!loading && recent.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {recent.map((idea) => (
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
      </div>
    </main>
  );
}