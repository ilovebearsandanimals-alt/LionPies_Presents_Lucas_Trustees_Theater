import React from 'react';
import Svg, { SvgProps } from 'react-native-svg';

// This interface extends the standard SvgProps but removes 'collapsable'
interface CleanSvgProps extends Omit<SvgProps, 'collapsable'> {}

// This component forwards all props to Svg EXCEPT for 'collapsable'
export const CleanSvg = React.forwardRef<Svg, CleanSvgProps>(
  ({ ...rest }, ref) => {
    return <Svg {...rest} ref={ref} />;
  }
);