export const addToCart = (item, cartData, setCartData) => {
  const isAvailable = cartData.filter((cartItem) => cartItem?.id === item.id);
  if (isAvailable.length === 0) {
    const newCartData = { ...item, quantity: 1 };
    setCartData([...cartData, newCartData]);
  } else {
    const filteredOutItemFromCart = cartData.filter(
      (cartItem) => cartItem?.id !== item.id
    );
    const availableItem = isAvailable[0];
    availableItem.quantity = availableItem.quantity + 1;
    setCartData([...filteredOutItemFromCart, availableItem]);
  }
};


export const getAvailableCopies = (cartData, cartItem) => {
  const isAvailableInCart = cartData.filter((item) => item.id === cartItem?.id);
  if (isAvailableInCart.length !== 0) {
    return isAvailableInCart[0].quantity;
  } else {
    return 0;
  }
};

export const returnArrayText = (arr) => {
  if (arr.length > 0) {
    let formattedString = ''
    for (const { name } of arr) {
      if (formattedString.length !== 0) {
        formattedString = `${formattedString}, ${name}`;
      } else {
        formattedString = `${name}`;
      }
    }
    return formattedString;
  }
}

export const removeFromCart = (cartData, item, setCartData) => {
  const filterItemFromCart = cartData.filter(
    (cartItem) => cartItem?.id !== item?.id
  );
  setCartData([...filterItemFromCart]);
};

export const getBookCount = (book, cartData) => {
  return parseInt(book.available_copies) - getAvailableCopies(cartData, book);
}
