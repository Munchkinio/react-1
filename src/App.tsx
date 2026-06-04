import { useState } from "react";
import "./App.css";
import Dialog from "./components/Dialog/Dialog";
import MovieForm from "./components/MovieForm/MovieForm";
import type { MovieProps } from "./types/movie";
import { createPortal } from "react-dom";
import { Routes, Route } from "react-router-dom";
import { MovieDetailsPage } from "./components/MovieDetailsPage/MovieDetailsPage";
import { HomePage } from "./components/HomePage/HomePage";

type DialogMode = "add" | "edit" | null;

function App() {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [editingMovie, setEditingMovie] = useState<MovieProps | undefined>();

  const openAddMovie = () => {
    setEditingMovie(undefined);
    setDialogMode("add");
  };
  const openEditMovie = (movie: MovieProps) => {
    setEditingMovie(movie);
    setDialogMode("edit");
  };

  const handleCloseDialog = () => {
    setDialogMode(null);
    setEditingMovie(undefined);
  };

  const handleFormSubmit = (movieData: MovieProps) => {
    console.log(
      dialogMode === "add" ? "Movie added: " : "Movie updated: ",
      movieData,
    );
    handleCloseDialog();
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage onAddMovie={openAddMovie} onEditMovie={openEditMovie} />
          }
        />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Routes>

      {dialogMode &&
        createPortal(
          <Dialog
            title={dialogMode === "add" ? "Add movie" : "Edit movie"}
            onClose={handleCloseDialog}
          >
            <MovieForm movie={editingMovie} onFormSubmit={handleFormSubmit} />
          </Dialog>,
          document.body,
        )}
    </>
  );
}

export default App;
