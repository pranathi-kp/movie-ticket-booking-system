export interface Seat {
  seatNumber: string;
  isAvailable: boolean;
}

export interface Showtime {
  id: number;
  startTime: string;
  endTime: string;
  movieId: number;
  createdAt: string;
  updatedAt: string;
  Seats: Seat[];
}

export interface Movie {
  Showtimes: any;
  id: number;
  name: string;
  description: string;
  genre: string;
  duration: number;
  posterUrl: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  Showtimes: Showtime[];
}
  
  export interface Booking {
    id: string;
    movie: Movie;
    seats: Seat[];
    showtime: Showtime;
    totalAmount: number;
  }
  
  export interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  }
  