import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { CleanLinearGradient } from '@/components/CleanLinearGradient';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: (t) => t,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        easing: (t) => t,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          easing: (t) => t,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: (t) => t,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onLoadingComplete?.();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <CleanLinearGradient
        colors={['#0F172A', '#1E293B', '#8B1538']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <AnimatedSvg
            width={120}
            height={120}
            viewBox="0 0 120 120"
            style={{
              transform: [{ rotate: spin }],
            }}
          >
            {/* SCAD Bee Body */}
            <Circle cx="60" cy="65" r="25" fill="#F59E0B" />
            
            {/* Bee Stripes */}
            <Path
              d="M40 55 L80 55 M40 65 L80 65 M40 75 L80 75"
              stroke="#1E293B"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Bee Wings */}
            <Circle cx="45" cy="45" r="12" fill="rgba(248, 250, 252, 0.8)" />
            <Circle cx="75" cy="45" r="12" fill="rgba(248, 250, 252, 0.8)" />
            <Circle cx="42" cy="42" r="8" fill="rgba(248, 250, 252, 0.6)" />
            <Circle cx="78" cy="42" r="8" fill="rgba(248, 250, 252, 0.6)" />
            
            {/* Bee Head */}
            <Circle cx="60" cy="35" r="15" fill="#EAB308" />
            
            {/* Bee Eyes */}
            <Circle cx="55" cy="32" r="3" fill="#1E293B" />
            <Circle cx="65" cy="32" r="3" fill="#1E293B" />
            
            {/* Bee Antennae */}
            <Path
              d="M55 25 Q52 20 50 18 M65 25 Q68 20 70 18"
              stroke="#1E293B"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx="50" cy="18" r="2" fill="#1E293B" />
            <Circle cx="70" cy="18" r="2" fill="#1E293B" />
          </AnimatedSvg>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>SCAD Theaters</Text>
          <Text style={styles.subtitle}>Trustees & Lucas</Text>
          <View style={styles.loadingDots}>
            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
            <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
          </View>
        </Animated.View>
      </CleanLinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
});