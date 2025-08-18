import React from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

// This interface extends the standard TouchableOpacityProps but removes 'collapsable'
interface CleanTouchableOpacityProps extends Omit<TouchableOpacityProps, 'collapsable'> {}

// This component forwards all props to TouchableOpacity EXCEPT for 'collapsable'
export const CleanTouchableOpacity = React.forwardRef<TouchableOpacity, CleanTouchableOpacityProps>(
  ({ ...rest }, ref) => {
    return <TouchableOpacity {...rest} ref={ref} />;
  }
);