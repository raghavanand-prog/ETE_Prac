export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-xs tracking-[0.2em] uppercase text-accent-400 mb-3">About</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-50">
        About the Innovation Hub
      </h1>
      <p className="mt-5 text-neutral-300 leading-relaxed">
        The Campus Idea &amp; Innovation Hub is a student-driven platform built to capture, share and
        grow the ideas that can improve campus life and beyond. Students submit a title, describe the
        problem they want to solve, choose a domain and list the technologies they plan to use.
      </p>
      <p className="mt-4 text-neutral-300 leading-relaxed">
        Every idea is added to a live feed that can be searched, filtered by domain or status, and sorted
        by date or title. Idea creators can update or remove their own submissions, while everyone can
        explore the growing collection of campus innovations.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Submit", "Share a clear title, problem and technology stack for your idea."],
          ["Explore", "Search and filter ideas across every innovation domain."],
          ["Grow", "Track your idea from New to Approved on the campus roadmap."]
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-neutral-800 bg-ink-200 p-5">
            <h3 className="font-bold text-accent-400">{t}</h3>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}