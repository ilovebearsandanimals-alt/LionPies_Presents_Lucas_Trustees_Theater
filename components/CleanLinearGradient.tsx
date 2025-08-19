import React from 'react';
import { LinearGradient, type LinearGradientProps } from 'expo-linear-gradient';
import { View } from 'react-native';

// This interface extends the standard LinearGradientProps but removes 'collapsable'
interface CleanLinearGradientProps extends Omit<LinearGradientProps, 'collapsable'> {}

// This component forwards all props to LinearGradient EXCEPT for 'collapsable'
export const CleanLinearGradient = React.forwardRef<View, CleanLinearGradientProps>(
  ({ collapsable, ...rest }, ref) => {
    return <LinearGradient {...rest} />;
  }
);