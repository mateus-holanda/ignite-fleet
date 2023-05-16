import { Container, Title, Slogan } from './styles';

import backgroundImg from '../../assets/background.png';

import { Button } from '../../components/Button';

export function SignIn() {
  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Managing your vehicles</Slogan>
      <Button title="SignIn with Google" />
    </Container>
  );
}

