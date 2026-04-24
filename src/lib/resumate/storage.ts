// Local persistence for ATS history (no backend required)
export interface HistoryEntry {
  id: string;
  date: number;
  filename: string;
  score: number;
  band: string;
  categories: { label: string; score: number }[];
}

const KEY = "resumate.history";

export const loadHistory = (): HistoryEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveHistory = (entry: HistoryEntry) => {
  const list = loadHistory();
  list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 30)));
};

export const clearHistory = () => localStorage.removeItem(KEY);