// Idea lifecycle statuses shown in workflow order
export const IDEA_STATUS = [
  "Submitted",
  "Under Review",
  "Approved",
  "Prototype",
  "Implemented"
];

// Styling per status (chip)
export const STATUS_STYLES = {
  "Submitted": "border-neutral-700 bg-neutral-800 text-neutral-300",
  "Under Review": "border-amber-400/40 bg-amber-400/10 text-amber-300",
  "Approved": "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  "Prototype": "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  "Implemented": "border-accent-500/40 bg-accent-500/10 text-accent-300"
};

export const DOMAIN_OPTIONS = [
  "Technology",
  "Education",
  "Health & Wellness",
  "Agriculture",
  "Business",
  "Social Impact",
  "Sustainability"
];

export const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch {
    return "";
  }
};