import type { MovieDto, MovieProps } from '../types/movie'

function parseReleaseDate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function mapMovieDtoToProps(dto: MovieDto): MovieProps {
  return {
    movieId: dto.id,
    movieTitle: dto.title,
    movieCover: dto.poster_path,
    movieReleaseDate: parseReleaseDate(dto.release_date),
    movieRelevantGenre: dto.genres,
    movieRating: dto.vote_average,
    movieDuration: dto.runtime,
    movieDescription: dto.overview,
  }
}

type MoviesResponse = {
  totalAmount: number
  data: MovieDto[]
  offset: number
  limit: number
}

export type GetMoviesParams = {
  filter?: string
  search?: string
  searchBy?: 'title' | 'genres'
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  offset?: number
  limit?: number
}

function formatGenreFilter(genre: string): string {
  return genre.charAt(0).toUpperCase() + genre.slice(1)
}

export async function getMovies(params: GetMoviesParams = {}): Promise<MovieProps[]> {
  const url = new URL('http://localhost:4000/movies');
  if (params.filter) {
    url.searchParams.set('filter', formatGenreFilter(params.filter))
  }
  if (params.search) {
    url.searchParams.set('search', params.search)
  }
  if (params.searchBy) {
    url.searchParams.set('searchBy', params.searchBy)
  }
  if (params.sortBy) {
    url.searchParams.set('sortBy', params.sortBy)
    url.searchParams.set('sortOrder', params.sortOrder ?? 'desc')
  }
  if (params.offset !== undefined) {
    url.searchParams.set('offset', String(params.offset))
  }
  if (params.limit !== undefined) {
    url.searchParams.set('limit', String(params.limit))
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`)
  }

  const json: MoviesResponse = await response.json()
  const items = Array.isArray(json.data) ? json.data : []
  return items.map(mapMovieDtoToProps)
}

export async function getMovieById(id: number): Promise<MovieProps> {
  const url = new URL('http://localhost:4000/movies/' + id);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
  }
  const json: MovieDto = await response.json();
  return mapMovieDtoToProps(json);
}

function formatReleaseDateForApi(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export type CreateMoviePayload = {
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
  genres: string[];
  overview: string;
};

export type UpdateMoviePayload = CreateMoviePayload & {
  id: number;
};

function mapMoviePropsToPayload(
  movie: Omit<MovieProps, "movieId">,
): CreateMoviePayload {
  return {
    title: movie.movieTitle,
    release_date: formatReleaseDateForApi(movie.movieReleaseDate),
    poster_path: movie.movieCover,
    vote_average: movie.movieRating,
    runtime: movie.movieDuration,
    genres: movie.movieRelevantGenre,
    overview: movie.movieDescription,
  };
}

export async function addMovie(
  movie: Omit<MovieProps, "movieId">,
): Promise<MovieProps> {
  const response = await fetch("http://localhost:4000/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapMoviePropsToPayload(movie)),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to add movie: ${response.status} ${response.statusText}`,
    );
  }

  const json: MovieDto = await response.json();
  return mapMovieDtoToProps(json);
}

export async function updateMovie(
  id: number,
  movie: Omit<MovieProps, "movieId">,
): Promise<MovieProps> {
  const body: UpdateMoviePayload = {
    id,
    ...mapMoviePropsToPayload(movie),
  };

  const response = await fetch("http://localhost:4000/movies", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update movie: ${response.status} ${response.statusText}`,
    );
  }

  const json: MovieDto = await response.json();
  return mapMovieDtoToProps(json);
}
