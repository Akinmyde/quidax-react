import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../assets/svgs/search.svg';
import { ReactComponent as CloseSvg } from '../assets/svgs/close.svg';
import { ReactComponent as MinusSvg } from '../assets/svgs/minus.svg';
import { ReactComponent as PlusSvg } from '../assets/svgs/plus.svg';
import { ReactComponent as CartSvg } from '../assets/svgs/cart.svg';
import { ReactComponent as ArrowSvg } from '../assets/svgs/arrow.svg';
import { gsap } from 'gsap';
import { screenSizes, colors } from '../utils/constants';
import { CheckoutButton } from './Button';
import { HeadTitle } from '../screens/HomeScreen';
import { BookContext } from '../context/BookContext';
import Navigation from './Navigation';
import { getAvailableCopies, removeFromCart } from '../utils/helpers';
import { Book } from './Book';
import { BookWrapper, BooksRowWrapper, TitleWrappper, BookPaddingContianer } from './Containers';

const MobileModal = styled.div`
  position: fixed;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ showWHiteBg }) => showWHiteBg ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0.4)'} ;
  @media (min-width: ${screenSizes.tabs}px) {
    display:none;
  }
`;

const WebModal = styled.div`
  position: fixed;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(255, 255, 255);
  background-color: rgba(255, 255, 255, 1);
  @media (max-width: ${screenSizes.tabs}px) {
    display:none;
  }
`;

const CartModalWrap = styled.div`
  position: fixed;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: flex-end;
  flex-direction:column;
`;

const SearchWrap = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${colors.white};
  border: 1px solid ${colors.red1};
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  position: fixed;
  z-index:99;
  @media (min-width: ${screenSizes.largeMobileScreen}px) and (max-width: ${screenSizes.tabs}px) {
    width: 91%;
  }
  @media (max-width: ${screenSizes.mediumMobileScreen}px) {
    width: 89%;
  }
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

const ArrowWrap = styled(ArrowSvg)`
      cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${({ alignItems }) => alignItems || 'center'};
  justify-content: ${({ jc }) => jc || 'center'};
  width: ${({ width }) => width || 'auto'};
  cursor: ${({ cursor }) => cursor || 'auto'};
  margin-top: ${({ mt }) => mt || '0px'};
`;

const WebSearchInput = styled.input`
  background: ${colors.white};
  border: 1px solid ${colors.grey};
  border-right: none;
  padding-left: 21px;
  padding-right: 21px;
  height: 36px;
  width: 100%;
  :focus {
    outline: none;
  }
`;

const SearchBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.blue};
  border: 1px solid ${colors.grey};
  padding-left: 12px;
  padding-right: 12px;
  height: 40px;
  outline: none;
  cursor:pointer;
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

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ jc }) => jc || 'initial'};
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

const Wrapper = styled.div`
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  height: 720%;
`;


export const SearchModal = ({ visible, setVisible }) => {
  const header = React.createRef();
  const alwaysOpen = true;
  const { searchText, setSearchText, bookData } = useContext(BookContext);



  useEffect(() => {
    gsap.fromTo(header.current, { y: -100 }, { y: 0 });
  }, [header, visible]);

  const handleClose = () => {
    gsap.fromTo(header.current, { y: 0 }, { y: -100 });
    setVisible(false);
  }

  const filteredBooks = applyFilters(bookData) || [];


  function applyFilters(books) {
    const tagFilter = books?.filter((k) => k?.tags.some((d) => d.name.toLowerCase().includes(searchText))) || [];
    const authorFilter = books?.filter((k) => k?.authors.some((d) => d.name.toLowerCase().includes(searchText))) || [];
    const genreFilter = books?.filter((k) => k?.genres.some((d) => d.name.toLowerCase().includes(searchText))) || [];
    const titleFilter = books?.filter(k => k?.title.toLowerCase().includes(searchText)) || [];

    const removedDuplicates = [...tagFilter, ...authorFilter, ...genreFilter, ...titleFilter].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
    return removedDuplicates;
  }

  return (
    <MobileModal showWHiteBg={searchText ? true : false} visible={visible}>
      <SearchWrap ref={header}>
        <ArrowWrap onClick={handleClose} />

        <Row width="80%">
          <WebSearchInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Books, genres, authors, etc."
          />
          <SearchBtn onClick={() => setSearchText('')}>
            {searchText ? <CloseSvg /> : <Search />}
          </SearchBtn>
        </Row>
      </SearchWrap>

      {searchText && alwaysOpen && (
        <Wrapper>
          <BookPaddingContianer
            ptL="90px"
            height="100%"
            mt="0px"
            mtm="0px"
            ptm="90px"
          >
            <TitleWrappper>
              <HeadTitle fontWeight="normal">
                <span style={{ fontWeight: 'bold' }}>
                  {filteredBooks.length} results{' '}
                </span>{' '}
                found for{' '}
                <span style={{ fontWeight: 'bold' }}>
                  `{searchText}`
                </span>
              </HeadTitle>
            </TitleWrappper>

            <BooksRowWrapper jc="space-between" wrap>
              {filteredBooks.map((f, index) => (
                <Book
                  top="40px"
                  book={f}
                  key={index + 'search'}
                  handleClose={handleClose}
                />
              ))}
            </BooksRowWrapper>
          </BookPaddingContianer>
        </Wrapper>
      )}
    </MobileModal>
  );
}

export const WebSearchModal = ({ visible, setVisible }) => {
  const content = React.createRef();
  const { searchText, bookData } = useContext(BookContext);
  const alwaysOpen = true;

  useEffect(() => {
    gsap.fromTo(content.current, { y: 1000 }, { y: 0 });
  }, [content, visible]);

  const handleClose = () => {
    setTimeout(() => {
      setVisible(false);
    }, 400);
  };

  const filteredBooks = applyFilters(bookData) || [];


  function applyFilters(books) {
    const tagFilter = books?.filter((k) => k?.tags.some((d) => d.name.toLowerCase().includes(searchText))) || [];
    const authorFilter = books?.filter((k) => k?.authors.some((d) => d.name.toLowerCase().includes(searchText))) || [];
    const genreFilter = books?.filter((k) => k?.genres.some((d) => d.name.toLowerCase().includes(searchText))) || [];
    const titleFilter = books?.filter(k => k?.title.toLowerCase().includes(searchText)) || [];

    const removedDuplicates = [...tagFilter, ...authorFilter, ...genreFilter, ...titleFilter].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
    return removedDuplicates;
  }


  return (
    <WebModal visible={visible}>
      <Navigation autoFocus={true} position="relative" />
      {searchText && alwaysOpen && (
        <Wrapper>
          <BookPaddingContianer
            ref={content}
            ptL="0px"
            height="100%"
            mt="0px"
            mtm="0px"
            ptm="90px"
          >
            <TitleWrappper>
              <HeadTitle fontWeight="normal">
                <span style={{ fontWeight: 'bold' }}>{filteredBooks.length} results </span> found for{' '}
                <span style={{ fontWeight: 'bold' }}>
                  `{searchText}`
                </span>
              </HeadTitle>
            </TitleWrappper>

            <BooksRowWrapper jc="space-between" wrap>
              {filteredBooks.map((f, index) => (
                <Book top="40px" book={f} key={index + 'search'} handleClose={handleClose} />
              ))}
              <BookWrapper mt="0px" />
            </BooksRowWrapper>
          </BookPaddingContianer>
        </Wrapper>
      )}
    </WebModal>
  );
};

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
  const { available_copies } = data;
  const actualCopiesAvailable = parseInt(available_copies) - getAvailableCopies(cartData, data);


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
  }, [searchHeader, visible]);

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
