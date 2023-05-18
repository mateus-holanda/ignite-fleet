import { useUser } from '@realm/react';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, ScrollView, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { TextAreaInput } from '../../components/TextAreaInput';
import { LicensePlateInput } from '../../components/LicensePlateInput';

import { useRealm } from '../../libs/realm';
import { History } from '../../libs/realm/schemas/History';

import { licensePlateValidation } from '../../utils/licensePlateValidation';

import { Container, Content } from './styles';

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  const { goBack } = useNavigation();
  const realm = useRealm();
  const user = useUser();

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidation(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert('Invalid License Plate', 'Please, inform a valid license plate.');
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert('Missing Purpose', 'Please, inform the purpose for taking the vehicle.');
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create('History', History.generate({
          user_id: user!.id,
          license_plate: licensePlate.toUpperCase(),
          description
        }))
      });

      Alert.alert('Departure Register', 'Vehicle is successfully registered for departure.');
      goBack();
    } catch (error) {
      console.log(error);
      setIsRegistering(false);
      return Alert.alert('Departure Register', 'There was an error trying to register this vehicle.');
    }
  }

  return (
    <Container>
      <Header title="Departure" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Vehicle license plate"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Purpose of use"
              placeholder="I'm taking this vehicle for..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title="Register departure"
              isLoading={isRegistering}
              onPress={handleDepartureRegister}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}