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
import { Ticket, Calendar, MapPin, Clock, QrCode, Download } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TicketBooking {
  id: string;
  movie: string;
  theater: string;
  date: string;
  time: string;
  seats: string[];
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const mockTickets: TicketBooking[] = [
  {
    id: '1',
    movie: 'The Artist\'s Journey',
    theater: 'Trustees Theater',
    date: 'Today, Jan 15',
    time: '8:45 PM',
    seats: ['A12', 'A13'],
    price: 28.00,
    status: 'confirmed'
  },
  {
    id: '2',
    movie: 'Midnight in Paris',
    theater: 'Lucas Theatre',
    date: 'Tomorrow, Jan 16',
    time: '7:30 PM',
    seats: ['B8'],
    price: 14.00,
    status: 'confirmed'
  },
  {
    id: '3',
    movie: 'Ocean\'s Mystery',
    theater: 'Trustees Theater',
    date: 'Thu, Jan 18',
    time: '6:30 PM',
    seats: ['C5', 'C6'],
    price: 28.00,
    status: 'pending'
  },
];

export default function TicketsScreen() {
  const [selectedTab, setSelectedTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

const safeAreaProps = Platform.OS !== 'web' ? { collapsable: false } : {};
  return (
    <SafeAreaView style={styles.container} {...safeAreaProps}>
      <LinearGradient
        colors={['#8B1538', '#1E293B']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>My Tickets</Text>
        <Text style={styles.headerSubtitle}>Your movie reservations</Text>
      </LinearGradient>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedTab === tab.id && styles.tabButtonActive
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab.id && styles.tabTextActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ticketsContainer}>
          {mockTickets.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <LinearGradient
                colors={['#8B1538', '#DC2626']}
                style={styles.ticketHeader}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.ticketHeaderContent}>
                  <View style={styles.ticketInfo}>
                    <Text style={styles.movieTitle} numberOfLines={1}>{ticket.movie}</Text>
                    <View style={styles.ticketDetailRow}>
                      <MapPin size={14} color="#F8FAFC" strokeWidth={2} />
                      <Text style={styles.ticketDetailText}>{ticket.theater}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(ticket.status)}</Text>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.ticketBody}>
                <View style={styles.ticketDetails}>
                  <View style={styles.detailColumn}>
                    <View style={styles.detailRow}>
                      <Calendar size={16} color="#F59E0B" strokeWidth={2} />
                      <Text style={styles.detailLabel}>Date</Text>
                    </View>
                    <Text style={styles.detailValue}>{ticket.date}</Text>
                  </View>
                  
                  <View style={styles.detailColumn}>
                    <View style={styles.detailRow}>
                      <Clock size={16} color="#F59E0B" strokeWidth={2} />
                      <Text style={styles.detailLabel}>Time</Text>
                    </View>
                    <Text style={styles.detailValue}>{ticket.time}</Text>
                  </View>
                </View>

                <View style={styles.seatsAndPrice}>
                  <View style={styles.seatsContainer}>
                    <Text style={styles.seatsLabel}>Seats</Text>
                    <View style={styles.seats}>
                      {ticket.seats.map((seat, index) => (
                        <View key={index} style={styles.seatBadge}>
                          <Text style={styles.seatText}>{seat}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  <Text style={styles.priceText}>${ticket.price.toFixed(2)}</Text>
                </View>

                <View style={styles.ticketActions}>
                  <TouchableOpacity style={styles.qrButton}>
                    <QrCode size={20} color="#FFFFFF" strokeWidth={2} />
                    <Text style={styles.qrButtonText}>Show QR Code</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Download size={18} color="#F59E0B" strokeWidth={2} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {mockTickets.length === 0 && (
          <View style={styles.emptyState}>
            <Ticket size={64} color="#64748B" strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No tickets yet</Text>
            <Text style={styles.emptyDescription}>
              Browse movies and book your first show
            </Text>
          </View>
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#8B1538',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#94A3B8',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  ticketsContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  ticketCard: {
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
  ticketHeader: {
    padding: 20,
  },
  ticketHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ticketInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  ticketDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ticketDetailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#F8FAFC',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  ticketBody: {
    padding: 20,
    paddingTop: 0,
  },
  ticketDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailColumn: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
  },
  seatsAndPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  seatsContainer: {
    flex: 1,
  },
  seatsLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    marginBottom: 8,
  },
  seats: {
    flexDirection: 'row',
    gap: 8,
  },
  seatBadge: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  seatText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
  },
  priceText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#F59E0B',
  },
  ticketActions: {
    flexDirection: 'row',
    gap: 12,
  },
  qrButton: {
    flex: 1,
    backgroundColor: '#8B1538',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  qrButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  downloadButton: {
    backgroundColor: '#334155',
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
});