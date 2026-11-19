// The only file to edit when the site's availability changes. Hero and contact
// read from here; the CV stays neutral so its static PDF never goes out of date.
export const availability = {
  openToInternships: false,
  status: "Building in public",
} as const;

// The status line at the top of the site. Keep it short: it is a status, not a bio.
export const now = {
  headline: "Building small web tools after class.",
} as const;
