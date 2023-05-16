import styled from 'styled-components/native';

import theme from '../../theme';

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
  text-align: center;

  color: ${theme.COLORS.BRAND_LIGHT};
  font-size: ${theme.FONT_SIZE.XXXL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

export const Slogan = styled.Text`
  text-align: center;
  margin-bottom: 32px;

  color: ${theme.COLORS.GRAY_100};
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;