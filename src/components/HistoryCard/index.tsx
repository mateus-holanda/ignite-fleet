import { useTheme } from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';
import { Check, ClockClockwise } from 'phosphor-react-native';

import { Container, LicensePlate, Info, Departure } from './styles';

export interface CardProps {
  id: string;
  licensePlate: string;
  createdAt: string;
  isSynced: boolean;
}

interface HistoryCardProps extends TouchableOpacityProps {
  data: CardProps;
}

export function HistoryCard({ data, ...rest }: HistoryCardProps) {
  const { COLORS } = useTheme();

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>
          {data.licensePlate}
        </LicensePlate>

        <Departure>
          {data.createdAt}
        </Departure>
      </Info>

      {
        data.isSynced ?
          <Check size={24} color={COLORS.BRAND_LIGHT} /> :
          <ClockClockwise size={24} color={COLORS.GRAY_400} />
      }
    </Container>
  );
}