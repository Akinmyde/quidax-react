import React, { useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ReactComponent as MinusSvg } from '../assets/svgs/minus.svg';
import { ReactComponent as PlusSvg } from '../assets/svgs/plus.svg';
import { ReactComponent as CartSvg } from '../assets/svgs/cart.svg';
import { ReactComponent as ArrowSvg } from '../assets/svgs/arrow.svg';
import { gsap } from 'gsap';
import { screenSizes, colors } from '../constants';
import { CheckoutButton } from './Button';
import { BookContext } from '../context/BookContext';
import { getBookCount, removeFromCart } from '../helpers';
import { Col, ModalContainer, Row } from './Containers';

const CartModalWrap = styled(ModalContainer)`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-end;
  flex-direction: column;
`;

const CartCont = styled.div`
  height: 100vh;
  width: 37vw;
  align-self: flex-end;
  background: ${colors.grey1};
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    width: 100%;
  }
  @media (min-width: ${screenSizes.largeMobileScreen}px) and (max-width: ${screenSizes.tabs}px) {
    width: 74vw;
  }
  @media (min-width: ${screenSizes.tabs}px) and (max-width: ${screenSizes.laptops}px) {
    width: 54vw;
  }
`;

const CartNavCont = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${colors.white};
  border: 1px solid ${colors.red1};
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    width: 88.3%;
  }
  @media (min-width: ${screenSizes.largeLaptops}px) {
    width: 94%;
  }
`;

export const ArrowWrap = styled(ArrowSvg)`
  cursor: pointer;
`;

const BackText = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  margin-left: 10px;
  color: ${colors.black};
  cursor:pointer;
`;

const CartHeadingText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: ${({ textAlign }) => textAlign || 'right'};
  margin-top: ${({ marginTop }) => marginTop || '0px'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0px'};
  margin-right: 10px;
`;

const CartItemWrap = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.red1};
  padding-bottom: 11px;
`;

const CartPadding = styled.div`
  padding: 0px 30px;
  overflow-y: scroll;
`;

const CartImage = styled.img`
  height: 90px;
  width: 60px;
  object-fit: cover;
  margin-right: 10px;
`;

const CartItemTitle = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: ${colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${({ width }) => width || '100%'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  margin-top: ${({ mt }) => mt || '0px'};
`;

const CartItemAuthor = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: ${colors.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CartItemPrice = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: right;
  color: ${colors.black};
`;

const Remove = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.black};
  cursor: pointer;
`;

const CounterBox = styled.div`
  cursor: pointer;
  background: ${({ bg }) => bg ? `${colors.blue}` : `${colors.white}`};
  border: 1px solid ${colors.grey};
  border-right: ${({ br }) => br ? `1px solid ${colors.grey}` : 'none'};
  border-left: ${({ bl }) => bl ? `1px solid ${colors.grey}` : 'none'};
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuantityText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  text-align: center;
  color: ${colors.black};
`;

const SubtotalText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${colors.black};
`;
const SubtotalAmount = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 28px;
  text-align: right;
  letter-spacing: -1px;
  color: ${colors.black};
`;

const SubtotalWrap = styled.div`
    margin-top: 38px;
`;

const CartItem = ({ data, index }) => {
  const { title, authors, quantity, price, image_url } = data;
  const { setCartData, cartData } = useContext(BookContext);

  return (
    <CartItemWrap>
      <Row width="27%" alignItems="inital" jc="space-between">
        <CartImage src={image_url} />
        <Col jc="space-between">
          <Col>
            <CartItemTitle>{title}</CartItemTitle>
            <CartItemAuthor>
              {authors.map(
                (author, index) =>
                  `${author?.name} ${index === authors.length - 1 ? '' : ' ,'}`
              )}
            </CartItemAuthor>
          </Col>

          <Remove onClick={() => removeFromCart(cartData, data, setCartData)}>
            Remove
          </Remove>
        </Col>
      </Row>

      <Col jc="space-between">
        <Col>
          <CartItemPrice>${price}</CartItemPrice>
          <CartCounter quantity={quantity} data={data} index={index} />
        </Col>

        <CartItemTitle mt="17px" textAlign="right">
          ${(parseFloat(quantity) * parseFloat(price)).toFixed(2)}
        </CartItemTitle>
      </Col>
    </CartItemWrap>
  );
}

const CartCounter = ({ quantity, data, index }) => {
  const { setCartData, cartData } = useContext(BookContext);
  const actualCopiesAvailable = useMemo(() => {
    return getBookCount(data, cartData)
  }, [data, cartData]);


  const decreaseQuantity = () => {
    if (parseInt(quantity) === 1) {
      const filteredOutItemFromCart = cartData.filter(
        (cartItem) => cartItem?.id !== data.id
      );
      setCartData(filteredOutItemFromCart);
    } else {
      const cartCopy = [...cartData];
      cartCopy[index].quantity = cartCopy[index].quantity - 1;
      setCartData(cartCopy);
    }
  }
  const increaseQuantity = () => {
    if (actualCopiesAvailable === 0) return;
    const cartCopy = [...cartData];
    cartCopy[index].quantity = cartCopy[index].quantity + 1;
    setCartData(cartCopy);
  }
  return (
    <Row mt="5px">
      <CounterBox onClick={decreaseQuantity} br bl bg>
        <MinusSvg />
      </CounterBox>
      <CounterBox>
        <QuantityText>{quantity}</QuantityText>
      </CounterBox>
      <CounterBox onClick={increaseQuantity} br bl bg>
        <PlusSvg />
      </CounterBox>
    </Row>
  );
};

export const CartModal = ({ visible, setVisible }) => {
  const searchHeader = React.createRef();
  const { cartData } = useContext(BookContext);

  useEffect(() => {
      gsap.fromTo(searchHeader.current, { x: 500 }, { x: 0 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    gsap.fromTo(searchHeader.current, { x: 0 }, { x: 500 });
    setTimeout(() => {
      setVisible(false);
    }, 400);
  };

  const calculateSubTotal = () => {
    const individualSums = [0, 0];
    cartData.map((item) => {
      const total = parseFloat(item.quantity) * parseFloat(item.price);
      return individualSums.push(total);
    });
    const sum = individualSums.reduce((a, b) => a + b);
    return sum.toFixed(2);
  }

  return (
    <CartModalWrap visible={visible}>
      <CartCont ref={searchHeader}>
        <CartNavCont>
          <Row onClick={handleClose}>
            <ArrowWrap />
            <BackText>Back</BackText>
          </Row>

          <Row>
            <CartHeadingText>Your Cart</CartHeadingText>
            <CartSvg />
          </Row>
        </CartNavCont>

        <CartPadding>
          {cartData.map((item, index) => {
            return (
              <CartItem key={item.id + 'cartItem'} data={item} index={index} />
            );
          })}
          {cartData.length === 0 && (
            <CartHeadingText
              textAlign="center"
              marginBottom="30%"
              marginTop="30%"
            >
              You have no items in your cart
            </CartHeadingText>
          )}

          {cartData.length !== 0 && (
            <>
              <SubtotalWrap>
                <Row width="100%" jc="space-between">
                  <SubtotalText>Subtotal</SubtotalText>
                  <SubtotalAmount>${calculateSubTotal()}</SubtotalAmount>
                </Row>
              </SubtotalWrap>

              <CheckoutButton />
            </>
          )}
        </CartPadding>
      </CartCont>
    </CartModalWrap>
  );
}
