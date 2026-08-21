export default function Header({ loggedIn }) {
  return (
    <section className="border-b border-neutral-800 bg-ink-100">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-xs tracking-[0.2em] text-accent-400 uppercase mb-3">
          Campus Idea &middot; Innovation Hub
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-50">
          Where bold ideas become
          <span className="text-accent-400"> campus impact</span>
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-300 leading-relaxed">
          Submit your innovation, explore ideas across technology, health, education and more,
          and help shape what is next. {loggedIn ? "You can now share your own idea below." : "Login to contribute your idea."}
        </p>
      </div>
    </section>
  );
}