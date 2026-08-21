import { Link, useNavigate, useParams } from "react-router-dom";
import IdeaForm from "../components/IdeaForm.jsx";

export default function EditPage({ ideas, loading, user, onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const idea = ideas.find((i) => i._id === id);

  if (loading) return <p className="mx-auto max-w-6xl px-5 py-20 text-center text-neutral-400">Loading...</p>;

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="text-2xl font-extrabold text-neutral-50">Login required</h1>
        <p className="mt-2 text-neutral-400">Please login to edit this idea.</p>
        <Link to="/" className="mt-5 inline-block rounded-md bg-accent-500 px-4 py-2.5 font-semibold text-neutral-900 hover:bg-accent-300">
          Go to login
        </Link>
      </main>
    );
  }

  if (!idea) {
    return (
      <main className="mx-auto max-w-xl px-5 py-20 text-center">
        <p className="text-neutral-300 font-medium">Idea not found</p>
        <Link to="/ideas" className="mt-3 inline-block text-accent-400 hover:underline">Back to feed</Link>
      </main>
    );
  }

  const handleSave = async (data) => {
    await onSave(data, id);
    navigate(`/ideas/${id}`);
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-50">Edit your idea</h1>
        <p className="text-neutral-400 mt-2">Update the details below and save your changes.</p>
      </div>
      <IdeaForm editing={idea} onSave={handleSave} onCancelEdit={() => navigate(`/ideas/${id}`)} />
    </main>
  );
}