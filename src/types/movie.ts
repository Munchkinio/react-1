export type MovieProps = {
  movieId: number,
  movieTitle: string,
  movieCover: string,
  movieReleaseDate: Date,
  movieRelevantGenre: string[],
  movieRating: number,
  movieDuration: number,
  movieDescription: string
}

export type MovieDto = {
  id: number
  title: string
  tagline?: string
  vote_average: number
  vote_count?: number
  release_date: string
  poster_path: string
  overview: string
  budget?: number
  revenue?: number
  genres: string[]
  runtime: number
}