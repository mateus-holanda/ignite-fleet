import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useQuery, useRealm } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';

import { HomeHeader } from '../../components/HomeHeader';
import { VehicleStatus } from '../../components/VehicleStatus';
import { CardProps, HistoryCard } from '../../components/HistoryCard';

import { Container, Content, Title, Label } from './styles';

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<History | null>(null);
  const [vehicleHistory, setVehicleHistory] = useState<CardProps[]>([]);

  const { navigate } = useNavigation();

  const realm = useRealm();

  const history = useQuery(History);

  function fetchHistory() {
    try {
      const response = history.filtered("status = 'arrival' SORT(created_at DESC)");

      const formattedHistory = response.map((item) => {
        return ({
          id: item._id!.toString(),
          licensePlate: item.license_plate,
          createdAt: dayjs(item.created_at).format('[Departure on] MM/DD/YYYY [at] HH:mm'),
          isSynced: false
        })
      });

      setVehicleHistory(formattedHistory);
    } catch (error) {
      console.log(error);
      Alert.alert('Vehicles History', 'There was an error fetching the history of vehicles.');
    }
  }

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse._id.toString() });
    } else {
      navigate('departure');
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = history.filtered("status = 'departure'")[0];
      setVehicleInUse(vehicle);
    } catch (error) {
      console.log(error);
      Alert.alert('Vehicles in use', 'There was an error while fetching the data.');
    }
  }

  useEffect(() => {
    fetchVehicleInUse();
  }, []);

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => realm.removeListener('change', fetchVehicleInUse);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [history]);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <VehicleStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Title>
          History
        </Title>

        <FlatList
          data={vehicleHistory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>
              No vehicles used and registered yet.
            </Label>
          )}
        />
      </Content>
    </Container>
  );
}