import styled from 'styled-components';
import { screenSizes, colors } from '../constants';

export const BookWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-top: ${({ mt }) => mt || '40px'};
  width: 30%;
  :hover {
    box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    width: 100%;
  }
  @media (min-width: ${screenSizes.largeMobileScreen}px) and (max-width: ${screenSizes.tabs}px) {
    width: 100%;
  }
  @media (min-width: ${screenSizes.tabs}px) and (max-width: ${screenSizes.laptops}px) {
    width: 50%;
  }
`;

export const BooksRowWrapper = styled.div`
  display: flex;
  padding-right: ${({ pr }) => pr || '0px'}};
  margin-top: ${({ mt }) => mt || '0px'}};
  border-right: ${({ br }) => br ? `1px solid ${colors.red1}` : 'none'}};
  align-items: center;
  flex-wrap: ${({ wrap }) => wrap || 'no-wrap'};
  justify-content: ${({ jc }) => jc || 'initial'};
`;

export const TitleWrappper = styled.div`
  padding: 0px 0px 14px 0px;
  border-bottom: 1px solid ${colors.red1};
  margin-bottom: 23px;
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    margin-bottom: 0px;
    margin-top: 60px;
  }
`;

export const BookPaddingContianer = styled.div`
  padding: 20px;
  margin-top: ${({ mt }) => mt || '65px'};
  
  background-color: white;
  height: ${({ height }) => height || 'auto'};
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    padding: 0px 19px;
    margin-top: 29px;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ mt }) => mt || '0px'};
  justify-content: ${({ jc }) => jc || 'initial'};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({ jc }) => jc || 'center'};
  width: ${({ width }) => width || 'auto'};
  cursor: ${({ cursor }) => cursor || 'auto'};
  margin-top: ${({ mt }) => mt || '0px'};
`;

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  @media (max-width: ${screenSizes.tabs}px) {
    display:none;
  }
`;