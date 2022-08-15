import { useContext, useEffect, useState } from 'react';
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
  const { setBookData, bookData, searchText } = useContext(BookContext);
  const [filteredBooks, setFilteredBooks] = useState(bookData)
  const { data, loading } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (!loading) {
      setBookData(data?.books)
      setFilteredBooks(data?.books)
    } else {
      setBookData([])
    }
  }, [data, loading, setBookData])

  useEffect(() => {
    if (searchText.length > 0) {
      const tagFilter = bookData?.filter(book => book?.tags.some((tag) => tag.name.toLowerCase().includes(searchText)));
      const authorFilter = bookData?.filter(book => book?.authors.some((tag) => tag.name.toLowerCase().includes(searchText)));
      const genreFilter = bookData?.filter(book => book?.genres.some((tag) => tag.name.toLowerCase().includes(searchText)));
      const titleFilter = bookData?.filter(book => book?.title.toLowerCase().includes(searchText));

      // Use the new set to remove duplicates
      const booksWithoutDuplicates = [...new Set([...tagFilter, ...authorFilter, ...genreFilter, ...titleFilter])];
      setFilteredBooks(booksWithoutDuplicates)
    } else {
      setFilteredBooks(bookData)
    }
  }, [bookData, searchText])

  if (!loading) return (
    <HomeHeadCont>
      {!searchText && (
        <Padded>
          <TitleWrappper>
            <HeadTitle>Featured Books</HeadTitle>
          </TitleWrappper>
        </Padded>
      )}

      {bookData?.length && (
        <>
          {!searchText && <Slider bookData={bookData} />}
          <BookPaddingContianer>
            <TitleWrappper>
              <HeadTitle>{searchText ? `${filteredBooks.length} result(s) found for ${searchText}` : "All Books"}</HeadTitle>
            </TitleWrappper>

            <BooksRowWrapper jc="space-between" wrap='wrap'>
              {filteredBooks.map((book) => <Book key={book.id} book={book} />)}
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
