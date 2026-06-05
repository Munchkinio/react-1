import { Routes, Route } from "react-router-dom";
import { MovieDetailsPage } from "./components/MovieDetailsPage/MovieDetailsPage";
import { MovieListComponent } from "./components/MovieListComponent/MovieListComponent";
import { SearchFormRoute } from "./components/SearchFormRoute/SearchFormRoute";
import { SearchFormIndex } from "./components/SearchFormRoute/SearchFormIndex";
import AddMovieForm from "./components/AddMovieForm/AddMovieForm";
import EditMovieForm from "./components/EditMovieForm/EditMovieForm";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieListComponent />}>
        <Route element={<SearchFormRoute />}>
          <Route index element={<SearchFormIndex />} />
          <Route path="new" element={<AddMovieForm />} />
          <Route path=":movieId/edit" element={<EditMovieForm />} />
        </Route>
        <Route path=":movieId" element={<MovieDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
