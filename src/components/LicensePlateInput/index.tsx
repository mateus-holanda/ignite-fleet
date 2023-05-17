import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, Label, Input } from './styles';
import { forwardRef } from 'react';

interface LicensePlateInputProps extends TextInputProps {
  label: string;
}

const LicensePlateInput = forwardRef<TextInput, LicensePlateInputProps>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input
        ref={ref}
        maxLength={7}
        autoCapitalize="characters"
        placeholderTextColor={COLORS.GRAY_400}
        {...rest}
      />
    </Container>
  );
});

export { LicensePlateInput };