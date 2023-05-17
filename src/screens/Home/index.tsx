import { HomeHeader } from '../../components/HomeHeader';
import { VehicleStatus } from '../../components/VehicleStatus';

import { Container, Content } from './styles';

export function Home() {
  return (
    <Container>
      <HomeHeader />

      <Content>
        <VehicleStatus />
      </Content>
    </Container>
  );
}