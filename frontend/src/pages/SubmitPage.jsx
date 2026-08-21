import { Link, useNavigate } from "react-router-dom";
import IdeaForm from "../components/IdeaForm.jsx";

export default function SubmitPage({ user, onSave }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-neutral-50">Login required</h1>
        <p className="mt-2 text-neutral-400">Please login to submit a new idea.</p>
        <Link to="/" className="mt-5 inline-block rounded-md bg-accent-500 px-4 py-2.5 font-semibold text-neutral-900 hover:bg-accent-300">
          Go to login
        </Link>
      </main>
    );
  }

  const handleSave = async (data) => {
    await onSave(data);
    navigate("/ideas");
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-50">Submit your idea</h1>
        <p className="text-neutral-400 mt-2">Fill in all the details below. Required fields are marked with *.</p>
      </div>
      <IdeaForm onSave={handleSave} />
    </main>
  );
}