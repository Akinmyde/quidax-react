import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, screenSizes } from '../constants';
import { ReactComponent as PrevSvg } from '../assets/svgs/caretBack.svg';
import { ReactComponent as NextSvg } from '../assets/svgs/caretForward.svg';

import { useViewport } from '../hooks/useViewport';


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

const Slider = ({ bookData }) => {
    const { width } = useViewport();

    return (
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
                <Link
                    key={book.id}
                    style={{ display: 'inline-block' }}
                    to={`/details/${book.id}`}
                    state={{ book }}
                >
                    <ImageCard key={book.id + 'featured'} src={book.image_url} />
                </Link>
            ))}
        </Carousel>
    )
}

export default Slider;
