import { useEffect, useState } from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, screenSizes } from '../constants';
import { useViewport } from '../hooks/useViewport';

import { ReactComponent as PrevSvg } from '../assets/svgs/caretBack.svg';
import { ReactComponent as NextSvg } from '../assets/svgs/caretForward.svg';

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
  cursor: pointer;
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
  cursor: pointer;
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    height: 230px;
  }
`;

const ImageCard = styled.img`
  height: 324px;
  width: 240px;
  object-fit: cover;
  @media (max-width: ${screenSizes.largeMobileScreen}px) {
    height: 221px;
    width: 134px;
  }
`;

const Slider = ({ bookData }) => {
    const { width } = useViewport();
    const [cellSpacing, setSellSpacing] = useState(10);
    const [slideShowSize, setSlideShowSize] = useState(4.5);

    useEffect(() => {
        if (width >= screenSizes.largeMobileScreen && width <= screenSizes.tabs) {
            setSellSpacing(15)
        } else if (width >= screenSizes.largeLaptops && width <= screenSizes.desktops) {
            setSellSpacing(10)
        } else {
            setSellSpacing(5)
        }
    }, [width])

    useEffect(() => {
        if(width >= screenSizes.largeLaptops && width <= screenSizes.desktops) {
            setSlideShowSize(5)
        } else if (width >= parseInt(screenSizes.largeLaptops)) {
            setSlideShowSize(8)
        } else if (width >= screenSizes.laptops && width <= screenSizes.largeLaptops) {
            setSlideShowSize(4.5)
        } else if (width >= screenSizes.tabs && width <= screenSizes.largeLaptops) {
            setSlideShowSize(3)
        } else if (width >= screenSizes.largeMobileScreen && width <= screenSizes.tabs) {
            setSlideShowSize(2.3)
        } else {
            setSlideShowSize(2.5)
        }
    }, [width])
    return (
        <Carousel
            cellSpacing={cellSpacing}
            autoplay
            slidesToShow={slideShowSize}
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
