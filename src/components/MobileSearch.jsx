import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { BookContext } from '../context/BookContext';
import { colors, screenSizes } from '../constants';

import { ReactComponent as Search } from '../assets/svgs/search.svg';
import { ReactComponent as CloseSvg } from '../assets/svgs/close.svg';
import { ReactComponent as ArrowSvg } from '../assets/svgs/arrow.svg';

import { ModalContainer, Row } from './Containers';

const MobileModalWrapper = styled(ModalContainer)`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  background-color: ${({ showWHiteBg }) => showWHiteBg ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 0, 0.4)'};
  height: 7%;
`;

const SearchViewWrapper = styled.div`
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

const SearchInput = styled.input`
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

const ArrowWrap = styled(ArrowSvg)`
  cursor: pointer;
`;

const MobileSearch = ({ visible, setVisible }) => {
  const location = useLocation();
  const header = React.createRef();
  const { searchText, setSearchText } = useContext(BookContext);

  const handleClose = () => {
    // gsap.fromTo(header.current, { y: 0 }, { y: -100 });
    setVisible(false);
    setSearchText('')
  }

  if (location.pathname === '/') {
    return (
      <MobileModalWrapper showWHiteBg={searchText ? true : false} visible={visible}>
        <SearchViewWrapper ref={header}>
          <ArrowWrap onClick={handleClose} />
          <Row width="80%">
            <SearchInput
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Books, genres, authors, etc."
            />
            <SearchBtn onClick={() => setSearchText('')}>{searchText ? <CloseSvg /> : <Search />}</SearchBtn>
          </Row>
        </SearchViewWrapper>
      </MobileModalWrapper>
    );
  } else {
    return <></>
  }
}

export default MobileSearch;
