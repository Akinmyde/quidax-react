import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { screenSizes, colors } from '../constants';

import { GET_BOOKS } from '../graphql/queries';
import { BookContext } from '../context/BookContext';
import { Book } from '../components/Book';
import { BookWrapper, BooksRowWrapper, BookPaddingContianer, TitleWrappper } from '../components/Containers';
import { SkeletonLoader } from '../components/Skeleton';
import Slider from '../components/Slider';

const HomeHeadCont = styled.div`
  margin-top: 120px;
  padding-bottom: 72px;
  @media (max-width: ${screenSizes.smallMobileScreen}px) {
    margin-top: 80px;
    padding-bottom: 32px;
  }
`;

export const HeadTitle = styled.p`
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
  font-size: 14px;
  color: ${colors.black};
`;

const Padded = styled.div`
  padding: 0px 52px;
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    display: none;
  }
`;



const HomeScreen = () => {
  const { setBookData, bookData } = useContext(BookContext);
  const { data, loading } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (!loading) {
      setBookData(data?.books)
    } else {
      setBookData([])
    }
  }, [data, loading, setBookData])

  if (!loading) return (
    <HomeHeadCont>
      <Padded>
        <TitleWrappper>
          <HeadTitle>Featured Books</HeadTitle>
        </TitleWrappper>
      </Padded>

      {bookData?.length && (
        <>
          <Slider bookData={bookData} />
          <BookPaddingContianer>
            <TitleWrappper>
              <HeadTitle>All Books</HeadTitle>
            </TitleWrappper>

            <BooksRowWrapper jc="space-between" wrap>
              {bookData.map((book) => <Book key={book.id} book={book} />)}
              <BookWrapper />
            </BooksRowWrapper>
          </BookPaddingContianer>
        </>
      )}
    </HomeHeadCont>)
  return (
    <SkeletonLoader />
  )
}

export default HomeScreen;