import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, ChevronRight, Calendar } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Showtime {
  id: string;
  movie: string;
  theater: string;
  times: string[];
  date: string;
  theater_address: string;
}

const mockShowtimes: Showtime[] = [
  {
    id: '1',
    movie: 'The Artist\'s Journey',
    theater: 'Trustees Theater',
    times: ['2:00 PM', '5:30 PM', '8:45 PM'],
    date: 'Today',
    theater_address: '216 E Broughton St'
  },
  {
    id: '2',
    movie: 'Midnight in Paris',
    theater: 'Lucas Theatre',
    times: ['1:15 PM', '4:00 PM', '7:30 PM', '10:15 PM'],
    date: 'Today',
    theater_address: '32 Abercorn St'
  },
  {
    id: '3',
    movie: 'Ocean\'s Mystery',
    theater: 'Trustees Theater',
    times: ['3:45 PM', '6:30 PM', '9:20 PM'],
    date: 'Tomorrow',
    theater_address: '216 E Broughton St'
  },
];

export default function ShowtimesScreen() {
  const [selectedDate, setSelectedDate] = useState('Today');
  const dates = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'];

  const filteredShowtimes = mockShowtimes.filter(showtime => 
    showtime.date === selectedDate
  );

  return (
    <SafeAreaView style={styles.container} collapsable={undefined}>
      <LinearGradient
        colors={['#8B1538', '#1E293B']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Showtimes</Text>
        <Text style={styles.headerSubtitle}>Plan your perfect movie night</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.datesContainer}
          contentContainerStyle={styles.datesContent}
        >
          {dates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                selectedDate === date && styles.dateButtonActive
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Calendar size={16} color={selectedDate === date ? '#FFFFFF' : '#64748B'} strokeWidth={2} />
              <Text style={[
                styles.dateText,
                selectedDate === date && styles.dateTextActive
              ]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.showtimesContainer}>
          {filteredShowtimes.map((showtime) => (
            <View key={showtime.id} style={styles.showtimeCard}>
              <View style={styles.movieHeader}>
                <View style={styles.movieInfo}>
                  <Text style={styles.movieTitle}>{showtime.movie}</Text>
                  <View style={styles.theaterInfo}>
                    <MapPin size={14} color="#F59E0B" strokeWidth={2} />
                    <Text style={styles.theaterName}>{showtime.theater}</Text>
                  </View>
                  <Text style={styles.theaterAddress}>{showtime.theater_address}</Text>
                </View>
              </View>
              
              <View style={styles.timesContainer}>
                <Text style={styles.timesLabel}>Showtimes</Text>
                <View style={styles.timeButtons}>
                  {showtime.times.map((time, index) => (
                    <TouchableOpacity key={index} style={styles.timeButton}>
                      <Clock size={14} color="#64748B" strokeWidth={2} />
                      <Text style={styles.timeText}>{time}</Text>
                      <ChevronRight size={14} color="#64748B" strokeWidth={2} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  datesContainer: {
    paddingLeft: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  datesContent: {
    paddingRight: 24,
    gap: 12,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    gap: 8,
  },
  dateButtonActive: {
    backgroundColor: '#8B1538',
    borderColor: '#8B1538',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94A3B8',
  },
  dateTextActive: {
    color: '#FFFFFF',
  },
  showtimesContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  showtimeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  movieHeader: {
    marginBottom: 16,
  },
  movieInfo: {
    gap: 6,
  },
  movieTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  theaterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  theaterName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
  },
  theaterAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  timesContainer: {
    gap: 12,
  },
  timesLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
  },
  timeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#334155',
    borderRadius: 8,
    gap: 8,
    minWidth: 120,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#F8FAFC',
    flex: 1,
  },
});