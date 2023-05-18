import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useQuery } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';

import { HomeHeader } from '../../components/HomeHeader';
import { VehicleStatus } from '../../components/VehicleStatus';

import { Container, Content } from './styles';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null);

  const { navigate } = useNavigation();

  const history = useQuery(History)

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse._id.toString() });
    } else {
      navigate('departure');
    }
  }

  function fetchHistory() {
    try {
      const vehicle = history.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      console.log(error);
      Alert.alert('Vehicles in use', 'There was an error while fetching the data.');
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <VehicleStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  );
}