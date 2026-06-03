import Dialog from '../Dialog/Dialog'
import './DeleteMovie.css'

type DeleteMovieProps = {
  movieId: number
  onDelete: (movieId: number) => void
  onClose: () => void
}

function DeleteMovie({ movieId, onDelete, onClose }: DeleteMovieProps) {
  const handleConfirm = () => {
    onDelete(movieId)
  }

  return (
    <Dialog title="Delete movie" size="compact" onClose={onClose}>
      <div className="delete-movie">
        <p className="delete-movie__message">Are you sure you want to delete this movie?</p>
        <div className="delete-movie__actions">
          <button type="button" className="delete-movie__confirm" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  )
}

export default DeleteMovie
