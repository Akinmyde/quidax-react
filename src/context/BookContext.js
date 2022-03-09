import React, { useState } from 'react';

export const BookContext = React.createContext({});

export const BookProvider = ({ children }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCartModal, showShowCartModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [bookData, setBookData] = useState([]);
  const [cartData, setCartData] = useState([]);

  return (
    <BookContext.Provider
      value={{
        showSearchModal,
        setShowSearchModal,
        showCartModal,
        showShowCartModal,
        searchText,
        setSearchText,
        bookData,
        setBookData,
        cartData,
        setCartData,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
