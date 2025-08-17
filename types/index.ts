export interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  duration: string;
  poster: string;
  rating_score: number;
  description: string;
  trailer_url?: string;
  director?: string;
  cast?: string[];
}

export interface Theater {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
}

export interface Showtime {
  id: string;
  movie_id: string;
  theater_id: string;
  date: string;
  time: string;
  available_seats: number;
  price: number;
}

export interface Festival {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  theater_id: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

export interface Ticket {
  id: string;
  user_id: string;
  showtime_id: string;
  seats: string[];
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  purchase_date: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  location: boolean;
  preferred_theater?: string;
  favorite_genres: string[];
}