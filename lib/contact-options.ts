/** Options for the project inquiry form (kept icon-free so the API route stays lean). */
export const projectTypes = [
  "Website development",
  "React / Next.js development",
  "WordPress development",
  "Figma to website",
  "Website redesign",
  "Other",
] as const;

export const budgetRanges = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not sure yet",
] as const;
