import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowSvg } from '../assets/svgs/arrow.svg';

import { AddToCartButton } from '../components/Button';
import { Text } from '../components/Text';
import { colors, screenSizes } from '../constants';
import { addToCart, getBookCount } from '../helpers';
import { BookContext } from '../context/BookContext';
import { useViewport } from '../hooks/useViewport';
import AvailableCopies from '../components/AvailableCopies';
import { Col } from '../components/Containers';
import BookInformation from '../components/BookInformation';

const DetailCont = styled.div`
   margin-top: 100px;
   padding: 0px 30px;
   overflow-y: scroll;
`;

const BackArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${screenSizes.xlMobileScreen}) {
    margin-top: 0px;
  }
`;

const DetailRow = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 38px;
  flex-wrap: wrap;
  @media (max-width: ${screenSizes.xlMobileScreen}) {
    flex-direction: column;
  }
`;

const BookCol = styled.div`
  flex:1;
`;

const DetailCol = styled.div`
  flex: 8;
  margin-bottom: 100px;
  @media (min-width: ${screenSizes.tabs}px) {
    padding-right: 10%;
    padding-left: 2%;
  }
`;

const BookCoverImage = styled.img`
  width: 243px;
  height: 364.5px;
  object-fit: fill;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.15);
  @media (max-width: ${screenSizes.xlMobileScreen}) {
    width: 133.33px;
    height: 200px;
    margin-bottom: 32px;
  }
`;

const DetailsScreen = () => {
  const { cartData, setCartData } = useContext(BookContext);
  const { state } = useLocation();
  const { book } = state;

  const [availableCopies, setAvailableCopies] = useState(0);
  const { width } = useViewport();

  const {
    image_url,
    title,
    subtitle,
    full_description,
    price,
    published_at,
    authors,
  } = book || {};

  useEffect(() => {
    setAvailableCopies(getBookCount(book, cartData),)
  }, [book, cartData])

  return !book ? (
    <></>
  ) : (
    <DetailCont>
      <Link to="/">
        <BackArrowWrapper>
          <ArrowSvg />
          <Text size='12px' ml="5px" fontWeight="bold">
            Back
          </Text>
        </BackArrowWrapper>
      </Link>
      <DetailRow>
        <BookCol>
          <BookCoverImage src={image_url} />
          {width >= screenSizes.largeMobileScreen && (
            <div>
              <Text mt="73px" mHide color={availableCopies !== 0 ? `${colors.green}` : `${colors.red}`}>
                {availableCopies !== 0 ? `${availableCopies} Copies Available` : 'out of stock'}
              </Text>
              <Text size='36px' mHide fontWeight="300">${price}</Text>
            </div>
          )}
          {(width >= screenSizes.tabs && availableCopies !== 0) && (
            <AddToCartButton
              onClick={() => addToCart(book || {}, cartData, setCartData)}
            />
          )}
        </BookCol>
        <DetailCol>
          <Text size='28px' fontWeight="bold">{title}</Text>
          <Col>
            <Text fontWeight="bold" mt="20px">
              {authors?.length > 0 && authors?.map((author, index) =>
                `${author?.name} ${index === authors?.length - 1 ? '' : ' ,'
                }`
              )}
            </Text>
            <Text mt="7px">{new Date(published_at).getFullYear()}</Text>
          </Col>
          <BookInformation book={book} />
          <Text fontWeight='bold' mt='62px' lineHeight='150%'>{subtitle}</Text>
          <Text mt='12px' lineHeight='150%'>{full_description}</Text>
        </DetailCol>
      </DetailRow>
      <AvailableCopies book={book} availableCopies={availableCopies} />
    </DetailCont>
  );
}

export default DetailsScreen