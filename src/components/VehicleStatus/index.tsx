import { TouchableOpacityProps } from 'react-native';
import { Car, Key } from 'phosphor-react-native';
import { useTheme } from 'styled-components';

import { Container, IconBox, Message, TextHighlight } from './styles';

interface VehicleStatusProps extends TouchableOpacityProps {
  licensePlate?: string | null;
}

export function VehicleStatus({ licensePlate = null, ...rest }: VehicleStatusProps) {
  const theme = useTheme();

  const Icon = licensePlate ? Key : Car;
  const message = licensePlate ? `Vehicle ${licensePlate} in use. ` : 'No vehicles currently in use. ';
  const status = licensePlate ? 'arrival' : 'departure';

  return (
    <Container {...rest}>
      <IconBox>
        <Icon
          size={32}
          color={theme.COLORS.BRAND_LIGHT}
        />
      </IconBox>

      <Message>
        {message}
        <TextHighlight>
          Tap here to register your {status}.
        </TextHighlight>
      </Message>
    </Container>
  );
}