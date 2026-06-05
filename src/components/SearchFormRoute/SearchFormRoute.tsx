import { useOutletContext } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import type { MovieListOutletContext } from "../MovieListComponent/MovieListComponent";

export function SearchFormRoute() {
  const outletContext = useOutletContext<MovieListOutletContext>();

  return (
    <SearchForm
      searchQuery={outletContext.searchQuery}
      onSearch={outletContext.onSearch}
      outletContext={outletContext}
    />
  );
}
