import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, ChevronRight, Clock, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CleanView } from '@/components/CleanView';

interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: string;
  duration: string;
  poster: string;
  rating_score: number;
  description: string;
}

const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'The Artist\'s Journey',
    genre: 'Drama',
    rating: 'PG-13',
    duration: '2h 15m',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating_score: 8.7,
    description: 'A compelling story of creativity and passion'
  },
  {
    id: '2',
    title: 'Midnight in Paris',
    genre: 'Romance',
    rating: 'PG',
    duration: '1h 55m',
    poster: 'https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating_score: 9.1,
    description: 'A romantic tale set in the city of lights'
  },
  {
    id: '3',
    title: 'Ocean\'s Mystery',
    genre: 'Thriller',
    rating: 'R',
    duration: '2h 05m',
    poster: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating_score: 8.3,
    description: 'Deep sea adventure with unexpected twists'
  },
];

export default function MoviesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Now Playing');

  const categories = ['Now Playing', 'Coming Soon', 'Special Events'];

  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <CleanView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#8B1538', '#1E293B']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Trustees & Lucas Theatres</Text>
        <Text style={styles.headerSubtitle}>Discover Cinema</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.moviesGrid}>
          {filteredMovies.map((movie) => (
            <TouchableOpacity key={movie.id} style={styles.movieCard}>
              <View style={styles.moviePoster}>
                <Image source={{ uri: movie.poster }} style={styles.posterImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.posterOverlay}
                />
                <View style={styles.ratingBadge}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
                  <Text style={styles.ratingText}>{movie.rating_score}</Text>
                </View>
              </View>
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={2}>{movie.title}</Text>
                <Text style={styles.movieGenre}>{movie.genre} • {movie.rating}</Text>
                <View style={styles.movieDetails}>
                  <Clock size={14} color="#64748B" strokeWidth={2} />
                  <Text style={styles.movieDuration}>{movie.duration}</Text>
                </View>
                <TouchableOpacity style={styles.buyTicketButton}>
                  <Text style={styles.buyTicketText}>Buy Tickets</Text>
                  <ChevronRight size={16} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.theaterInfo}>
          <Text style={styles.sectionTitle}>Our Theaters</Text>
          <View style={styles.theaterCards}>
            <TouchableOpacity style={styles.theaterCard}>
              <Text style={styles.theaterName}>Trustees Theater</Text>
              <Text style={styles.theaterAddress}>216 E Broughton St, Savannah, GA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.theaterCard}>
              <Text style={styles.theaterName}>Lucas Theatre For the Arts</Text>
              <Text style={styles.theaterAddress}>32 Abercorn St, Savannah, GA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#F59E0B" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      </CleanView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E2E8F0',
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#F8FAFC',
  },
  filterButton: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  categoriesContent: {
    paddingRight: 24,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  categoryButtonActive: {
    backgroundColor: '#8B1538',
    borderColor: '#8B1538',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94A3B8',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  moviesGrid: {
    paddingHorizontal: 24,
    gap: 20,
  },
  movieCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  moviePoster: {
    position: 'relative',
    height: 200,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  posterOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  movieInfo: {
    padding: 16,
  },
  movieTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
    marginBottom: 4,
    lineHeight: 24,
  },
  movieGenre: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    marginBottom: 8,
  },
  movieDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  movieDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  buyTicketButton: {
    backgroundColor: '#8B1538',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buyTicketText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  theaterInfo: {
    padding: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  theaterCards: {
    gap: 16,
  },
  theaterCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  theaterName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  theaterAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    lineHeight: 20,
  },
});