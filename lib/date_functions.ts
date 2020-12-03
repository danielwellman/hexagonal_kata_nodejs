// Create a date using the YYYY-MM-DD format.  I kept this helper because it helped me when I forgot that the
// month argument in the Date constructor is zero-based, and had surprising results.
// For background, see https://twitter.com/hillelogram/status/1329228419628998665
export function date(date: string): Date {
    return new Date(date + "T00:00:00");
}