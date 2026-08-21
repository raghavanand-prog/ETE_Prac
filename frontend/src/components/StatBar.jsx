import { IDEA_STATUS } from "../constants";

export default function StatBar({ ideas }) {
  const total = ideas.length;
  const totalVotes = ideas.reduce((sum, i) => sum + (i.voteCount || 0), 0);

  const byStatus = IDEA_STATUS.map((s) => ({
    name: s,
    count: ideas.filter((i) => i.status === s).length
  }));

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-xl border border-neutral-800 bg-ink-200 p-4">
        <p className="text-3xl font-extrabold text-accent-400">{total}</p>
        <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Total ideas</p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-ink-200 p-4">
        <p className="text-3xl font-extrabold text-accent-400">{totalVotes}</p>
        <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Total votes</p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-ink-200 p-4">
        <p className="text-3xl font-extrabold text-accent-400">
          {ideas.reduce((m, i) => Math.max(m, i.voteCount || 0), 0)}
        </p>
        <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Top votes</p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-ink-200 p-4">
        <p className="text-3xl font-extrabold text-accent-400">
          {byStatus.find((s) => s.name === "Under Review")?.count || 0}
        </p>
        <p className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Under review</p>
      </div>
      <div className="col-span-2 sm:col-span-4">
        <div className="rounded-xl border border-neutral-800 bg-ink-200 p-4">
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-3">Ideas by status</p>
          <div className="flex flex-wrap gap-2">
            {byStatus.map((s) => (
              <span key={s.name} className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
                {s.name} <span className="text-accent-400 font-semibold">{s.count}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}