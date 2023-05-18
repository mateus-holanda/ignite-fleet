import { BSON } from 'realm';
import { X } from 'phosphor-react-native';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useObject, useRealm } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ButtonIcon } from '../../components/ButtonIcon';

import { Container, Content, Label, LicensePlate, Description, Footer } from './styles';

interface RouteParamsProps {
  id: string;
}

export function Arrival() {
  const { goBack } = useNavigation();
  const realm = useRealm();
  
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const history = useObject(History, new BSON.UUID(id));

  function handleRemoveVehicleUsage() {
    Alert.alert(
      'Cancel',
      'Do you want to cancel using this vehicle?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => removeVehicleUsage() }
      ]
    );
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(history);
    });

    goBack();
  }

  return (
    <Container>
      <Header title="Arrival" />

      <Content>
        <Label>
          Vehicle license plate
        </Label>

        <LicensePlate>
          {history?.license_plate}
        </LicensePlate>

        <Label>
          Purpose of use
        </Label>

        <Description>
          {history?.description}
        </Description>

        <Footer>
          <ButtonIcon
            icon={X}
            onPress={handleRemoveVehicleUsage}
          />

          <Button
            title="Register arrival"
          />
        </Footer>
      </Content>
    </Container>
  );
}