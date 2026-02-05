/**
 * Re-export from split data modules.
 * Actual data lives in lib/data/*.ts; this file exists for build resolution.
 * Use ./data/index to avoid "./data" resolving to this file.
 */
export * from "./data/index";
