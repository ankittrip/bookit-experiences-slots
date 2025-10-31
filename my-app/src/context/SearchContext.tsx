import { createContext } from "react";

export interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);
