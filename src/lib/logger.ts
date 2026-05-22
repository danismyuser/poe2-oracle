/**
 * Lightweight structured logger. Writes JSON lines to stdout, which Vercel
 * captures into its log stream. No external dependencies.
 *
 * Usage:
 *   log.info("oracle.ask", { userId, questionLength: 120 });
 *   log.error("oracle.error", { userId, err: String(err) });
 */

type Level = "info" | "warn" | "error";

interface Fields {
  [key: string]: unknown;
}

function emit(level: Level, event: string, fields: Fields) {
  const line = {
    ts: new Date().toISOString(),
    level,
    event,
    ...fields,
  };
  // eslint-disable-next-line no-console
  (level === "error" ? console.error : console.log)(JSON.stringify(line));
}

export const log = {
  info:  (event: string, fields: Fields = {}) => emit("info", event, fields),
  warn:  (event: string, fields: Fields = {}) => emit("warn", event, fields),
  error: (event: string, fields: Fields = {}) => emit("error", event, fields),
};
