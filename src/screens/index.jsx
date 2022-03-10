import React, { useContext } from 'react'
import { CartModal, SearchModal, WebSearchModal } from '../components/Modals';
import NavBar from '../components/Navigation';
import { BookContext } from '../context/BookContext';
import Home from './HomeScreen';
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
      <div>
        <NavBar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/details/:id" element={<BookDetails />} />
          </Routes>
        </div>
        <SearchModal visible={showSearchModal} setVisible={setShowSearchModal} />
        <WebSearchModal visible={searchText ? true : false} setVisible={() => setSearchText('')} />
        <CartModal visible={showCartModal} setVisible={showShowCartModal} />
      </div>
    </Router>
  );
}

export default Screens;