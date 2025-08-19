import React from 'react';
import { View, type ViewProps } from 'react-native';

// This interface extends the standard ViewProps but removes the 'collapsable' property.
interface CleanViewProps extends Omit<ViewProps, 'collapsable'> {}

// This component takes all props, but specifically ignores 'collapsable'
// by not passing it down in the {...rest} spread.
export const CleanView = React.forwardRef<View, CleanViewProps>(
  ({ collapsable, ...rest }, ref) => {
    return <View {...rest} ref={ref} />;
  }
);