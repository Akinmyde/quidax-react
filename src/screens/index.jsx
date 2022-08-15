import React, { useContext } from 'react'
import { CartModal } from '../components/CartModals';
import NavBar from '../components/Navigation';
import { BookContext } from '../context/BookContext';
import HomeScreen from './HomeScreen';
import BookDetails from './DetailsScreen';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MobileSearch from '../components/MobileSearch';

const Screens = () => {
  const {
    showSearchModal,
    setShowSearchModal,
    showCartModal,
    showShowCartModal,
  } = useContext(BookContext);

  return (
    <Router>
      <>
        <NavBar />
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/details/:id" element={<BookDetails />} />
          </Routes>
        <MobileSearch visible={showSearchModal} setVisible={setShowSearchModal} />
        <CartModal visible={showCartModal} setVisible={showShowCartModal} />
      </>
    </Router>
  );
}

export default Screens;