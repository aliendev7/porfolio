/**
 * Canonical slug generator — the single source of truth.
 *
 * Lowercases, strips characters that aren't word chars / spaces / hyphens,
 * collapses runs of spaces/underscores/hyphens into a single hyphen, and trims
 * leading/trailing hyphens. (Previously some routes double-escaped `\s`, which
 * stripped the literal letter "s" from titles — fixed here.)
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
