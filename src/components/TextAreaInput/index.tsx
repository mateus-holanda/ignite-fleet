import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, Label, Input } from './styles';

interface TextAreaInputProps extends TextInputProps {
  label: string;
}

const TextAreaInput = forwardRef<TextInput, TextAreaInputProps>(({ label, ...rest }, ref ) => {
  const { COLORS } = useTheme();
  
  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input
        ref={ref}
        placeholderTextColor={COLORS.GRAY_400}
        autoCapitalize="sentences"
        multiline
        {...rest}
      />
    </Container>
  );
});

export { TextAreaInput };