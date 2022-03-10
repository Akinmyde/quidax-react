import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CartSvg } from '../assets/svgs/cartWhite.svg';
import { screenSizes, colors } from '../constants';

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  justify-content: space-between;
  padding: 19px; 24px;
  display: flex;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  margin: 18px 0 0 0;
  background: ${colors.black};
`;

const AddToCartButtonWrapper = styled(Button)`
  @media (max-width: ${screenSizes.tabs}px) {
   display:none;
  }
`;

const CheckoutText = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: ${colors.white};
  padding-right: 30px;
`;

export const CheckoutButton = () => (
  <Button>
    <CartSvg />
    <CheckoutText>Proceed to Checkout</CheckoutText>
  </Button>
);

export const AddToCartButton = ({ onClick }) => (
  <AddToCartButtonWrapper onClick={onClick}>
    <CartSvg />
    <CheckoutText>Add to Cart</CheckoutText>
  </AddToCartButtonWrapper>
);
