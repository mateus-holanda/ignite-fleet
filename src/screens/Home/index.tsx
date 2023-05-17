import { useNavigation } from '@react-navigation/native';

import { HomeHeader } from '../../components/HomeHeader';
import { VehicleStatus } from '../../components/VehicleStatus';

import { Container, Content } from './styles';

export function Home() {
  const { navigate } = useNavigation();

  function handleRegisterMovement() {
    navigate('departure');
  }

  return (
    <Container>
      <HomeHeader />

      <Content>
        <VehicleStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  );
}