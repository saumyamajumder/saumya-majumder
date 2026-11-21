/** Options for the project inquiry form (kept icon-free so the API route stays lean). */
export const projectTypes = [
  "React / Next.js development",
  "WordPress development",
  "Figma to website",
  "Website redesign",
  "Other",
] as const;

export const budgetRanges = [
  "Under $50",
  "$50 – $100",
  "$100 – $200",
  "$200 – $300",
  "$500+",
  "Not sure yet",
] as const;
