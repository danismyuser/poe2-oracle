/**
 * Admin authorization check. ADMIN_EMAILS env var holds a comma-separated
 * list of email addresses with admin access (currently: viewing all crafts
 * via /admin). Empty/unset means no admins.
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}
