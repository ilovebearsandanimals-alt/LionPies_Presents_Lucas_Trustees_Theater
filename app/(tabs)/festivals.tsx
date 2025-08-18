import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, MapPin, Users, Award, ExternalLink } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Festival {
  id: string;
  name: string;
  description: string;
  dates: string;
  location: string;
  attendees: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

const mockFestivals: Festival[] = [
  {
    id: '1',
    name: 'Savannah Film Festival',
    description: 'Annual celebration of independent cinema featuring premieres, documentaries, and emerging filmmakers.',
    dates: 'Oct 26 - Nov 2, 2025',
    location: 'Both Theaters',
    attendees: '2,000+ expected',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Classic Cinema Week',
    description: 'A week-long tribute to golden age Hollywood with restored prints and special presentations.',
    dates: 'Dec 15 - 22, 2025',
    location: 'Lucas Theatre',
    attendees: '800+ expected',
    image: 'https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Documentary Spotlight',
    description: 'Showcasing the year\'s most compelling documentaries with filmmaker Q&A sessions.',
    dates: 'Jan 18 - 25, 2025',
    location: 'Trustees Theater',
    attendees: '1,200+ expected',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'ongoing'
  },
];

export default function FestivalsScreen() {
  const isCollapsed = false;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#F59E0B';
      case 'ongoing': return '#10B981';
      case 'past': return '#6B7280';
      default: return '#F59E0B';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Upcoming';
      case 'ongoing': return 'Now Playing';
      case 'past': return 'Completed';
      default: return 'Upcoming';
    }
  };

  return (
    <SafeAreaView style={styles.container} data-collapsable={isCollapsed}>
      <LinearGradient
        colors={['#8B1538', '#1E293B']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Festivals & Events</Text>
        <Text style={styles.headerSubtitle}>Celebrate cinema with us</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.festivalsContainer}>
          {mockFestivals.map((festival) => (
            <TouchableOpacity key={festival.id} style={styles.festivalCard}>
              <View style={styles.festivalImageContainer}>
                <Image source={{ uri: festival.image }} style={styles.festivalImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.imageOverlay}
                />
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(festival.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(festival.status)}</Text>
                </View>
              </View>
              
              <View style={styles.festivalContent}>
                <Text style={styles.festivalName}>{festival.name}</Text>
                <Text style={styles.festivalDescription} numberOfLines={3}>
                  {festival.description}
                </Text>
                
                <View style={styles.festivalDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#F59E0B" strokeWidth={2} />
                    <Text style={styles.detailText}>{festival.dates}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MapPin size={16} color="#F59E0B" strokeWidth={2} />
                    <Text style={styles.detailText}>{festival.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Users size={16} color="#F59E0B" strokeWidth={2} />
                    <Text style={styles.detailText}>{festival.attendees}</Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.learnMoreButton}>
                  <Text style={styles.learnMoreText}>Learn More</Text>
                  <ExternalLink size={16} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>What's Next</Text>
          <View style={styles.upcomingCard}>
            <Award size={24} color="#F59E0B" strokeWidth={2} />
            <View style={styles.upcomingContent}>
              <Text style={styles.upcomingTitle}>Awards Season Showcase</Text>
              <Text style={styles.upcomingDescription}>
                Join us for an exclusive preview of this year's award contenders
              </Text>
              <Text style={styles.upcomingDate}>Coming March 2025</Text>
            </View>
          </View>
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
  festivalsContainer: {
    padding: 24,
    gap: 24,
  },
  festivalCard: {
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
  festivalImageContainer: {
    position: 'relative',
    height: 180,
  },
  festivalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  festivalContent: {
    padding: 20,
  },
  festivalName: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  festivalDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    lineHeight: 24,
    marginBottom: 16,
  },
  festivalDetails: {
    gap: 12,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#E2E8F0',
  },
  learnMoreButton: {
    backgroundColor: '#8B1538',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  learnMoreText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  upcomingSection: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  upcomingCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  upcomingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 6,
  },
  upcomingDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
  },
});