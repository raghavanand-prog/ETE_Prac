import { useEffect, useState } from "react";
import { DOMAIN_OPTIONS, IDEA_STATUS } from "../constants";

const EMPTY = {
  title: "",
  problemStatement: "",
  description: "",
  domain: "",
  technologies: "",
  expectedImpact: "",
  status: "Submitted"
};

export default function IdeaForm({ editing, onSave, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        problemStatement: editing.problemStatement,
        description: editing.description || "",
        domain: editing.domain,
        technologies: editing.technologies,
        expectedImpact: editing.expectedImpact || "",
        status: editing.status || "Submitted"
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Idea title is required";
    else if (form.title.trim().length < 3) err.title = "Title must be at least 3 characters";

    if (!form.problemStatement.trim()) err.problemStatement = "Problem statement is required";
    else if (form.problemStatement.trim().length < 10)
      err.problemStatement = "Describe the problem in at least 10 characters";

    if (!form.description.trim()) err.description = "Description is required";
    else if (form.description.trim().length < 10)
      err.description = "Add a short description of at least 10 characters";

    if (!form.domain) err.domain = "Please choose a valid domain";
    else if (!DOMAIN_OPTIONS.includes(form.domain)) err.domain = "Please choose a valid domain";

    if (!form.technologies.trim()) err.technologies = "Mention at least one technology";
    else if (form.technologies.trim().length < 2) err.technologies = "Please enter at least one technology";

    if (!form.expectedImpact.trim()) err.expectedImpact = "Expected impact is required";
    else if (form.expectedImpact.trim().length < 3)
      err.expectedImpact = "Expected impact should be at least 3 characters";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checked = validate();
    setErrors(checked);
    if (Object.keys(checked).length) return;

    onSave({
      title: form.title.trim(),
      problemStatement: form.problemStatement.trim(),
      description: form.description.trim(),
      domain: form.domain,
      technologies: form.technologies.trim(),
      expectedImpact: form.expectedImpact.trim(),
      status: form.status
    });
    if (!editing) {
      setForm(EMPTY);
      setErrors({});
    }
  };

  const field = (hasErr) =>
    `w-full rounded-md border ${hasErr ? "border-red-500" : "border-neutral-700"} bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent-500`;
  const errText = (key) => errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>;
  const labelClass = "block text-sm font-medium text-neutral-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-800 bg-ink-200 p-6 grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-50">{editing ? "Update your idea" : "Submit a new idea"}</h2>
        {editing && (
          <button type="button" onClick={onCancelEdit} className="text-sm text-neutral-400 hover:text-neutral-100">Cancel edit</button>
        )}
      </div>

      <div>
        <label className={labelClass}>Idea title *</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Smart attendance using face recognition" className={field(errors.title)} />
        {errText("title")}
      </div>

      <div>
        <label className={labelClass}>Problem statement *</label>
        <textarea name="problemStatement" value={form.problemStatement} onChange={handleChange} rows={3} placeholder="Describe the real problem your idea solves..." className={field(errors.problemStatement)} />
        {errText("problemStatement")}
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Expand on how the idea works..." className={field(errors.description)} />
        {errText("description")}
      </div>

      <div>
        <label className={labelClass}>Expected impact *</label>
        <textarea name="expectedImpact" value={form.expectedImpact} onChange={handleChange} rows={2} placeholder="What will this idea improve for students or the campus?" className={field(errors.expectedImpact)} />
        {errText("expectedImpact")}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Domain *</label>
          <select name="domain" value={form.domain} onChange={handleChange} className={field(errors.domain)}>
            <option value="">Select domain</option>
            {DOMAIN_OPTIONS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errText("domain")}
        </div>
        <div>
          <label className={labelClass}>Technologies *</label>
          <input type="text" name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, OpenCV" className={field(errors.technologies)} />
          {errText("technologies")}
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={field(false)}>
            {IDEA_STATUS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
        <button type="submit" className="rounded-md bg-accent-500 px-5 py-2.5 font-semibold text-neutral-900 hover:bg-accent-300">
          {editing ? "Update Idea" : "Add Idea"}
        </button>
        {editing && (
          <button type="button" onClick={onCancelEdit} className="rounded-md border border-neutral-700 px-5 py-2.5 font-medium text-neutral-300 hover:text-neutral-100">Cancel</button>
        )}
      </div>
    </form>
  );
}
