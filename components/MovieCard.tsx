import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Star, ChevronRight } from 'lucide-react-native';

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

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
}

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.posterContainer}>
        <Image source={{ uri: movie.poster }} style={styles.poster} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        />
        <View style={styles.ratingBadge}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
          <Text style={styles.ratingText}>{movie.rating_score}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <Text style={styles.genre}>{movie.genre} • {movie.rating}</Text>
        <View style={styles.details}>
          <Clock size={14} color="#64748B" strokeWidth={2} />
          <Text style={styles.duration}>{movie.duration}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
          <ChevronRight size={16} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  posterContainer: {
    position: 'relative',
    height: 200,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
    marginBottom: 4,
    lineHeight: 24,
  },
  genre: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  button: {
    backgroundColor: '#8B1538',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});