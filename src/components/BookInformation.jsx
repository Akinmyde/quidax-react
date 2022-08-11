import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

import { ReactComponent as PeopleSvg } from '../assets/svgs/people.svg';
import { ReactComponent as HeeartSvg } from '../assets/svgs/heart.svg';
import { Text } from './Text';
import { colors, screenSizes } from '../constants';
import { returnArrayText } from '../helpers';
import { useViewport } from '../hooks/useViewport';

const BookDetailsFlex = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || 'row'};
    gap: ${({ gap }) => gap || '5px'};
    padding-left: ${({ paddingLeft }) => paddingLeft || 0};
    justify-content: ${({ justifyContent }) => justifyContent || 'initial'};
    width: ${({ width }) => width};
    margin: ${({ margin }) => margin || 0}
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

const BookContentWrapper = styled.div`
  width: 100%;
  display: ${(isLargeScreen) => isLargeScreen ? 'flex' : 'none'}
  gap: ${(isLargeScreen) => isLargeScreen ? '10px' : 0}
`;

const BookInformation = ({ book }) => {
    const { width } = useViewport();
    const isLargeScreen = width >= screenSizes.largeMobileScreen;

    return (
        <BookDetailsWrapper isLargeScreen={isLargeScreen}>
            <BookContentWrapper style={{ width: '100%' }}>
              <BookDetailsFlex margin='30px 0' justifyContent='space-between'>
                <BookDetailsFlex justifyContent='space-between'>
                <BookDetailsFlex direction='column'>
                  <PeopleSvg />
                  <Text size='12px' textAlign="center">
                    {book.number_of_purchases}
                  </Text>
                </BookDetailsFlex>
                <BookDetailsFlex direction='column'>
                  <HeeartSvg />
                  <Text size='12px' textAlign="center">
                    {book.likes}
                  </Text>
                </BookDetailsFlex>
                </BookDetailsFlex>
                <BookDetailsFlex direction='column' justifyContent='space-between'>
                  <Text fontWeight='bold'>Ratings: {book.rating}</Text>
                  <StarRatings
                    rating={book.rating}
                    starRatedColor={colors.yellow}
                    numberOfStars={5}
                    starDimension={'15px'}
                    starSpacing="4px"
                    name="rating"
                  />
                </BookDetailsFlex>
              </BookDetailsFlex>
              <BookDetailsFlex margin='30px 0' justifyContent='space-between'>
                <BookDetailsFlex gap='20px' direction='column' justifyContent='space-between'>
                  <BookDetailsFlex direction='column'>
                    <Text fontWeight="bold">Genre</Text>
                    <Text>{returnArrayText(book.genres || [])}</Text>
                  </BookDetailsFlex>
                  <BookDetailsFlex direction='column'>
                    <BookDetailsFlex direction='column'>
                      <Text fontWeight="bold">Publisher</Text>
                      <Text>{book.publisher}</Text>
                    </BookDetailsFlex>
                  </BookDetailsFlex>
                </BookDetailsFlex>
                <BookDetailsFlex direction='column' justifyContent='space-between'>
                  <BookDetailsFlex direction='column'>
                    <Text fontWeight="bold">Tags</Text>
                    <Text>{returnArrayText(book.tags || [])}</Text>
                  </BookDetailsFlex>
                  <BookDetailsFlex direction='column'>
                    <Text fontWeight="bold">Released</Text>
                    <Text>
                      {new Date(book.release_date).toDateString()}
                    </Text>
                  </BookDetailsFlex>
                </BookDetailsFlex>
              </BookDetailsFlex>
            </BookContentWrapper>
          </BookDetailsWrapper>
    )
}

export default BookInformation;
