import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowSvg } from '../assets/svgs/arrow.svg';
import { ReactComponent as PeopleSvg } from '../assets/svgs/people.svg';
import { ReactComponent as HeeartSvg } from '../assets/svgs/heart.svg';

import { AddToCartButton } from '../components/Button';
import { Text } from '../components/Text';
import { colors, screenSizes } from '../utils/constants';
import StarRatings from 'react-star-ratings';
import { GET_BOOK } from '../graphql/queries';
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as CartSvg } from '../assets/svgs/cartWhite.svg';
import { addToCart, getAvailableCopies, returnArrayText } from '../utils/helpers';
import { BookContext } from '../context/BookContext';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { useViewport } from '../hooks/useViewport';

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

const BookDetailsWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.white1};
  border-bottom: 1px solid ${colors.white1};
  margin-top: 20px;
  display: flex;
  gap: 10px;
  padding: 10px 0;
  @media (max-width: ${screenSizes.xlMobileScreen}) {
    flex-direction: column;
  }
`;

const BookDetailsFlex = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    gap: ${({ gap }) => gap || '5px'};
    padding-left: ${({ paddingLeft }) => paddingLeft || 0};
    justify-content: ${({ justifyContent }) => justifyContent || 'initial'};
    width: ${({ width }) => width};
    margin: ${({ margin }) => margin || 0}
`;

const Ruller = styled.div`
  width: 1px;
  height: 45px;
  background-color: ${colors.white1};
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

const Col = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ mt }) => mt || '0px'};
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

const AddToCartButtonWrap = styled.button`
  outline: none;
  border: none;
  background: ${colors.black};
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
  padding: 19px; 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 85%;
  bottom: 20px;
  cursor: pointer;
   @media (min-width: ${screenSizes.tabs}) {
   display:none;
  }
`;


const DetailsScreen = () => {
  const { cartData, setCartData } = useContext(BookContext);
  const params = useParams();

  const { id } = params;
  const { loading, data, error } = useQuery(GET_BOOK, { variables: { id: id } });
  
  const [availableCopies, setAvailableCopies] = useState(0);
  const [book, setBook] = useState({});
  const { width } = useViewport();

  useEffect(() => {
    if (!loading) {
      setBook(data?.book)
    }
  }, [data, loading])

  const {
    image_url,
    title,
    subtitle,
    rating,
    full_description,
    price,
    available_copies,
    likes,
    number_of_purchases,
    published_at,
    authors,
    release_date,
    genres,
    tags,
    publisher,
  } = book || {};

  useEffect(() => {
    const copies = parseInt(available_copies) - getAvailableCopies(cartData, book);
    setAvailableCopies(copies)
  }, [available_copies, book, cartData])

  return loading && error ? (
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
              onClick={() => addToCart(data.book || {}, cartData, setCartData)}
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
          <BookDetailsWrapper>
            {width > screenSizes.largeMobileScreen ?
              (
                <div style={{ width: '100%', display: 'flex', gap: '10px' }} >
                  <BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <PeopleSvg />
                      <Text size='12px' textAlign="center">
                        {number_of_purchases}
                      </Text>
                    </BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <HeeartSvg />
                      <Text size='12px' textAlign="center">
                        {likes}
                      </Text>
                    </BookDetailsFlex>
                  </BookDetailsFlex>
                  <Ruller />
                  <BookDetailsFlex width='100%' justifyContent='space-between'>
                    <BookDetailsFlex direction='column'>
                      <Text fontWeight='bold'>Ratings: {rating}</Text>
                      <StarRatings
                        rating={rating}
                        starRatedColor={colors.yellow}
                        numberOfStars={5}
                        starDimension={'15px'}
                        starSpacing="2px"
                        name="rating"
                      />
                    </BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <Text fontWeight="bold">Genre</Text>
                      <Text>{returnArrayText(genres || [])}</Text>
                    </BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <Text fontWeight="bold">Tags</Text>
                      <Text>{returnArrayText(tags || [])}</Text>
                    </BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <Text fontWeight="bold">Publisher</Text>
                      <Text>{publisher}</Text>
                    </BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <Text fontWeight="bold">Released</Text>
                      <Text>
                        {moment(release_date).format('d MMMM, YYYY')}
                      </Text>
                    </BookDetailsFlex>
                  </BookDetailsFlex>
                </div>
              ) :
              (
                <div style={{ width: '100%' }}>
                  <BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <PeopleSvg />
                      <Text size='12px' textAlign="center">
                        {number_of_purchases}
                      </Text>
                    </BookDetailsFlex>
                    <BookDetailsFlex direction='column'>
                      <HeeartSvg />
                      <Text size='12px' textAlign="center">
                        {likes}
                      </Text>
                    </BookDetailsFlex>
                    <Ruller />
                    <BookDetailsFlex direction='column'>
                      <Text fontWeight='bold'>Ratings: {rating}</Text>
                      <StarRatings
                        rating={rating}
                        starRatedColor={colors.yellow}
                        numberOfStars={5}
                        starDimension={'15px'}
                        starSpacing="2px"
                        name="rating"
                      />
                    </BookDetailsFlex>
                  </BookDetailsFlex>
                  <BookDetailsFlex margin='30px 0' justifyContent='space-between'>
                    <BookDetailsFlex gap='20px' direction='column' justifyContent='space-between'>
                      <BookDetailsFlex direction='column'>
                        <Text fontWeight="bold">Genre</Text>
                        <Text>{returnArrayText(genres || [])}</Text>
                      </BookDetailsFlex>
                      <BookDetailsFlex direction='column'>
                        <BookDetailsFlex direction='column'>
                          <Text fontWeight="bold">Publisher</Text>
                          <Text>{publisher}</Text>
                        </BookDetailsFlex>
                      </BookDetailsFlex>
                    </BookDetailsFlex>
                    <BookDetailsFlex direction='column' justifyContent='space-between'>
                      <BookDetailsFlex direction='column'>
                        <Text fontWeight="bold">Tags</Text>
                        <Text>{returnArrayText(tags || [])}</Text>
                      </BookDetailsFlex>
                      <BookDetailsFlex direction='column'>
                        <Text fontWeight="bold">Released</Text>
                        <Text>
                          {moment(release_date).format('d MMMM, YYYY')}
                        </Text>
                      </BookDetailsFlex>
                    </BookDetailsFlex>
                  </BookDetailsFlex>
                </div>
              )
            }
          </BookDetailsWrapper>

          <Text fontWeight='bold' mt='62px' lineHeight='150%'>{subtitle}</Text>
          <Text mt='12px' lineHeight='150%'>{full_description}</Text>
        </DetailCol>
      </DetailRow>
      {(width < screenSizes.laptops) &&
        availableCopies !== 0 && (
          <AddToCartButtonWrap
            onClick={() => addToCart(data.book || {}, cartData, setCartData)}
          >
            <CartSvg />
            <Col>
              <Text size='12px' fontWeight="bold" color="white">
                Add to Cart
              </Text>
              <Text size='12px' color={colors.green}>
                {availableCopies} Copies Available
              </Text>
            </Col>
            <Text size='28px' fontWeight="300" color="white">
              ${price}
            </Text>
          </AddToCartButtonWrap>
        )
      }
    </DetailCont>
  );
}

export default DetailsScreen