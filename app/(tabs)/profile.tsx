import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Bell, 
  CreditCard, 
  Settings, 
  LogOut, 
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const menuItems = [
    { id: 'payment', label: 'Payment Methods', icon: CreditCard, action: () => {} },
    { id: 'notifications', label: 'Notification Settings', icon: Bell, action: () => {} },
    { id: 'settings', label: 'App Settings', icon: Settings, action: () => {} },
    { id: 'logout', label: 'Sign Out', icon: LogOut, action: () => {}, danger: true },
  ];
const safeAreaProps = Platform.OS !== 'web' ? { collapsable: false } : {};
const safeAreaProps = Platform.OS !== 'web' ? { collapsable: false } : { collapsable: undefined };
  return (
    <SafeAreaView style={styles.container} {...safeAreaProps}>
      <LinearGradient
        colors={['#8B1538', '#1E293B']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#F59E0B', '#EAB308']}
              style={styles.avatar}
            >
              <User size={32} color="#FFFFFF" strokeWidth={2} />
            </LinearGradient>
          </View>
          <Text style={styles.userName}>Alex Thompson</Text>
          <Text style={styles.userEmail}>alex.thompson@email.com</Text>
          <View style={styles.membershipBadge}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" strokeWidth={0} />
            <Text style={styles.membershipText}>Premium Member</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={'false'}>
        <View style={styles.userInfoCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Mail size={18} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.infoText}>alex.thompson@email.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Phone size={18} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.infoText}>(555) 123-4567</Text>
          </View>
          <View style={styles.infoRow}>
            <MapPin size={18} color="#F59E0B" strokeWidth={2} />
            <Text style={styles.infoText}>Savannah, GA</Text>
          </View>
        </View>

        <View style={styles.preferencesCard}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Bell size={20} color="#F8FAFC" strokeWidth={2} />
              <View style={styles.preferenceText}>
                <Text style={styles.preferenceLabel}>Push Notifications</Text>
                <Text style={styles.preferenceDescription}>Get notified about new releases</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#334155', true: '#8B1538' }}
              thumbColor={notificationsEnabled ? '#F59E0B' : '#64748B'}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <MapPin size={20} color="#F8FAFC" strokeWidth={2} />
              <View style={styles.preferenceText}>
                <Text style={styles.preferenceLabel}>Location Services</Text>
                <Text style={styles.preferenceDescription}>Find nearby showtimes</Text>
              </View>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#334155', true: '#8B1538' }}
              thumbColor={locationEnabled ? '#F59E0B' : '#64748B'}
            />
          </View>
        </View>

        <View style={styles.menuCard}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemContent}>
                <item.icon 
                  size={20} 
                  color={item.danger ? '#EF4444' : '#F8FAFC'} 
                  strokeWidth={2} 
                />
                <Text style={[
                  styles.menuItemText,
                  item.danger && styles.menuItemTextDanger
                ]}>
                  {item.label}
                </Text>
              </View>
              <ChevronRight 
                size={18} 
                color={item.danger ? '#EF4444' : '#64748B'} 
                strokeWidth={2} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>15</Text>
              <Text style={styles.statLabel}>Movies Watched</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Festivals Attended</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$280</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
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
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E2E8F0',
    marginBottom: 12,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  membershipText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#F59E0B',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  userInfoCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#E2E8F0',
  },
  preferencesCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  preferenceText: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  preferenceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#94A3B8',
  },
  menuCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#F8FAFC',
  },
  menuItemTextDanger: {
    color: '#EF4444',
  },
  statsCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#94A3B8',
    textAlign: 'center',
  },
});