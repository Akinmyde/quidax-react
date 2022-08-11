import React, { useContext } from 'react'
import { CartModal, SearchModal, WebSearchModal } from '../components/Modals';
import NavBar from '../components/Navigation';
import { BookContext } from '../context/BookContext';
import HomeScreen from './HomeScreen';
import BookDetails from './DetailsScreen';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

const Screens = () => {
  const {
    showSearchModal,
    setShowSearchModal,
    showCartModal,
    showShowCartModal,
    searchText,
    setSearchText
  } = useContext(BookContext);

  return (
    <Router>
      <>
        <NavBar />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/details/:id" element={<BookDetails />} />
          </Routes>
        <SearchModal visible={showSearchModal} setVisible={setShowSearchModal} />
        <WebSearchModal visible={searchText ? true : false} setVisible={() => setSearchText('')} />
        <CartModal visible={showCartModal} setVisible={showShowCartModal} />
      </>
    </Router>
  );
}

export default Screens;