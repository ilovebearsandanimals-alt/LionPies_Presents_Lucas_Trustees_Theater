import { Tabs } from 'expo-router';
import { Film, Calendar, Ticket, User, Star } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F59E0B',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#1E293B',
          borderTopWidth: 1,
          borderTopColor: '#334155',
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 11,
          marginBottom: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Movies',
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconContainer}>
              <Film size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="showtimes"
        options={{
          title: 'Showtimes',
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconContainer}>
              <Calendar size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="festivals"
        options={{
          title: 'Festivals',
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconContainer}>
              <Star size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'My Tickets',
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconContainer}>
              <Ticket size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <View style={styles.iconContainer}>
              <User size={size} color={color} strokeWidth={2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});