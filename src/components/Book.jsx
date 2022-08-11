import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import { screenSizes, colors } from '../constants';
import { BookWrapper } from './Containers';
import { BookContext } from '../context/BookContext';
import { addToCart, getAvailableCopies } from '../helpers';

import { ReactComponent as PeopleSvg } from '../assets/svgs/people.svg';
import { ReactComponent as HeartSvg } from '../assets/svgs/heart.svg';
import { ReactComponent as CartSvg } from '../assets/svgs/smallCart.svg';

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${({ left }) => left || 0}
`;

const Image = styled.img`
  height: 185px;
  width: 115px;
  margin-right: 13px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: ${colors.black};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.p`
  margin-top: ${({ top }) => top || 0};
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.black};
  @media (max-width: ${screenSizes.smallMobileScreen}px) {
    flex-direction: column;
  }
`;

const SubtitleText = styled.p`
  font-weight: ${({ fontWeight }) => fontWeight || 'normal'};
  font-size: 12px;
  color: ${({ color }) => color || `${colors.black}`};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  margin-left: ${({ left }) => left || 0};
`;

const FlexWrapperRow = styled.div`
  display: flex;
  padding-right: ${({ right }) => right || 0}};
  margin-top: ${({ top }) => top || 0}};
  border-right: ${({ borderRight }) => borderRight ? `1px solid ${colors.red1}` : 'none'}};
  align-items: center;
  flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'no-wrap'};
  justify-content: ${({ jc }) => jc || 'initial'};
`;

export const Book = ({ top, book, handleClose }) => {
  const {
    image_url,
    title,
    rating,
    price,
    available_copies,
    likes,
    number_of_purchases,
    published_at,
    authors,
    genres,
  } = book;

  const { cartData, setCartData } = useContext(BookContext);
  const [availableCopies, setAvailableCopies] = useState(available_copies);

  useEffect(() => {
    const copies = parseInt(available_copies) - getAvailableCopies(cartData, book);
    setAvailableCopies(copies)
  }, [available_copies, book, cartData])

  return (
    <BookWrapper top={top}>
      <Link to={`/details/${book.id}`} state={{ book }}>
        <div onClick={() => handleClose && handleClose()}>
          <Image src={image_url} />
        </div>
      </Link>
      <div onClick={() => handleClose && handleClose()}>
        <FlexWrapper>
          <Link to={`/details/${book.id}`} state={{ book }}>
            <Title>{title}</Title>
            <Author top="6px">
              {authors.map(
                (author, index) =>
                  `${author?.name} ${index === authors.length - 1 ? '' : ' ,'}`
              )}{' '}
              - {new Date(published_at).getFullYear()}
            </Author>
            <Author>
              {genres.map(
                (genre, index) =>
                  `${genre?.name} ${index === genres.length - 1 ? '' : ' ,'}`
              )}
            </Author>

            <FlexWrapperRow top="12px">
              <FlexWrapperRow borderRight right="14px">
                <FlexWrapper>
                  <PeopleSvg />
                  <SubtitleText>{number_of_purchases}</SubtitleText>
                </FlexWrapper>

                <FlexWrapper>
                  <HeartSvg />
                  <SubtitleText>{likes}</SubtitleText>
                </FlexWrapper>
              </FlexWrapperRow>

              <FlexWrapper left="10px">
                <SubtitleText textAlign="left">Rating:{rating} </SubtitleText>
                <StarRatings
                  rating={rating}
                  starRatedColor={colors.yellow}
                  numberOfStars={5}
                  starDimension={'15px'}
                  starSpacing="2px"
                  name="rating"
                />
              </FlexWrapper>
            </FlexWrapperRow>

            <FlexWrapperRow top="13px">
              <SubtitleText>${price}</SubtitleText>
              <SubtitleText
                left="6px"
                color={availableCopies !== 0 ? `${colors.green}` : `${colors.red}`}
              >
                {availableCopies !== 0
                  ? `${availableCopies} Copies Available`
                  : 'Out of stock'}
              </SubtitleText>
            </FlexWrapperRow>
          </Link>

          {availableCopies !== 0 && (
            <FlexWrapperRow
              onClick={() => addToCart(book || {}, cartData, setCartData)}
              top="10px"
            >
              <CartSvg />
              <SubtitleText fontWeight="bold" left="6px">
                Add to Cart
              </SubtitleText>
            </FlexWrapperRow>
          )}
        </FlexWrapper>
      </div>
    </BookWrapper>
  );
};
