import styled from 'styled-components';
import { colors } from '../constants';

export const Text = styled.p`
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-size: ${({ size }) => size || '14px'};
  color: ${({ color }) => color || colors.black};
  margin-left: ${({ ml }) => ml || '0px'};
  margin-top: ${({ mt }) => mt || '0px'};
  margin-bottom: ${({ mb }) => mb || '0px'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  line-height: ${({ lineHeight }) => lineHeight};
`;
