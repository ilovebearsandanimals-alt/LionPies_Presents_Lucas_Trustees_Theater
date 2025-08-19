import React from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';

// This interface extends the standard ScrollViewProps but removes 'collapsable'
interface CleanScrollViewProps extends Omit<ScrollViewProps, 'collapsable'> {}

// This component forwards all props to ScrollView EXCEPT for 'collapsable'
export const CleanScrollView = React.forwardRef<ScrollView, CleanScrollViewProps>(
  ({ collapsable, ...rest }, ref) => {
    return <ScrollView {...rest} ref={ref} />;
  }
);