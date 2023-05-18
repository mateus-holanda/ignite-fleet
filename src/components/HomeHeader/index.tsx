import { TouchableOpacity } from 'react-native';
import { Power } from 'phosphor-react-native';
import { useApp, useUser } from '@realm/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container, Greeting, Message, Name, Picture } from './styles';

import theme from '../../theme';

export function HomeHeader() {
  const app = useApp();
  const user = useUser();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  function handleLogout() {
    app.currentUser?.logOut();
  }

  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureUrl }} 
        placeholder="L184i9offQof00ayfQay~qj[fQj["
      />
      <Greeting>
        <Message>
          Hi,
        </Message>

        <Name>
          {user?.profile.name}
        </Name>
      </Greeting>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}