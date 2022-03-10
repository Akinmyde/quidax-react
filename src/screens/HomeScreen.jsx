import { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';

import { screenSizes, colors } from '../constants';
import { ReactComponent as PrevSvg } from '../assets/svgs/caretBack.svg';
import { ReactComponent as NextSvg } from '../assets/svgs/caretForward.svg';
import { useViewport } from '../hooks/useViewport';
import { GET_BOOKS } from '../graphql/queries';
import { BookContext } from '../context/BookContext';
import { Book } from '../components/Book';
import { BookWrapper, BooksRowWrapper, BookPaddingContianer, TitleWrappper } from '../components/Containers';
import { SkeletonLoader } from '../components/Skeleton';

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

const SwiperPrevBtn = styled.div`
  background: linear-gradient(
    180deg,
    rgba(248, 248, 250, 0.8) 0%,
    ${colors.white2} 51.36%,
    rgba(248, 248, 250, 0.8) 100%
  );
  color: black;
  width: 40px;
  margin: 0%;
  padding: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 330px;
  mix-blend-mode: normal;
  opacity: 0.8;
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    height: 230px;
  }
`;

const SwiperNextBtn = styled.div`
  background: linear-gradient(
    180deg,
    rgba(248, 248, 250, 0.8) 0%,
    ${colors.white2} 51.36%,
    rgba(248, 248, 250, 0.8) 100%
  );
  color: black;
  width: 40px;
  margin: 0%;
  padding: 0%;
  height: 330px;
  mix-blend-mode: normal;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    height: 230px;
  }
`;

const ImageCard = styled.img`
  height: 324px;
  width: auto;
  object-fit: cover;
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    height: 221px;
    width: 134px;
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

  const { width } = useViewport();

  if (!loading) return (
    <HomeHeadCont>
      <Padded>
        <TitleWrappper>
          <HeadTitle>Featured Books</HeadTitle>
        </TitleWrappper>
      </Padded>

      {bookData?.length && (
        <div>
          <Carousel
            cellSpacing={
              width >= screenSizes.largeMobileScreen && width <= screenSizes.tabs
                ? 15
                : width >= screenSizes.largeLaptops && width <= screenSizes.desktops
                  ? 10
                  : 5
            }
            autoplay
            slidesToShow={
              width >= screenSizes.largeLaptops && width <= screenSizes.desktops
                ? 5
                : width >= parseInt(screenSizes.largeLaptops)
                  ? 8
                  : width >= screenSizes.laptops && width <= screenSizes.largeLaptops
                    ? 4.5
                    : width >= screenSizes.tabs && width <= screenSizes.largeLaptops
                      ? 3
                      : width >= screenSizes.largeMobileScreen && width <= screenSizes.tabs
                        ? 2.3
                        : 2.5
            }
            slidesToScroll={1}
            renderCenterLeftControls={({ previousSlide }) => (
              <SwiperPrevBtn onClick={previousSlide}>
                <PrevSvg />
              </SwiperPrevBtn>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <SwiperNextBtn onClick={nextSlide}>
                <NextSvg />
              </SwiperNextBtn>
            )}
            defaultControlsConfig={{
              pagingDotsStyle: {
                fill: `${colors.grey2}`
              }
            }}
          >
            {bookData.map((book) => (
              <Link style={{ display: 'inline-block' }} to={{ pathname: `/details/${book.id}` }}>
                <ImageCard key={book.id + 'featured'} src={book.image_url} />
              </Link>
            ))}
          </Carousel>

          <BookPaddingContianer>
            <TitleWrappper>
              <HeadTitle>All Books</HeadTitle>
            </TitleWrappper>

            <BooksRowWrapper jc="space-between" wrap>
              {bookData.map((book) => <Book key={book.id} book={book} />)}
              <BookWrapper />
            </BooksRowWrapper>
          </BookPaddingContianer>
        </div>
      )}
    </HomeHeadCont>)
    return (
      <SkeletonLoader />
    )
}

export default HomeScreen;