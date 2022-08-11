import styled from 'styled-components';
import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

import { colors, screenSizes } from '../constants';
import { addToCart } from '../helpers';

import { ReactComponent as CartSvg } from '../assets/svgs/cartWhite.svg';
import { useViewport } from '../hooks/useViewport';
import { Text } from './Text';
import { Col } from './Containers';

const AddToCartButtonWrap = styled.button`
    outline: none;
    border: none;
    background: ${colors.black};
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.05);
    padding: 19px; 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 85%;
    bottom: 20px;
    cursor: pointer;
    @media (min-width: ${screenSizes.tabs}) {
    display:none;
    }
`;

const AvailableCopies = ({ book, availableCopies }) => {
    const { cartData, setCartData } = useContext(BookContext);
    const { width } = useViewport();

    return (
        (width < screenSizes.laptops) &&
        availableCopies !== 0 && (
            <AddToCartButtonWrap
                onClick={() => addToCart(book || {}, cartData, setCartData)}
            >
                <CartSvg />
                <Col>
                    <Text size='12px' fontWeight="bold" color="white">
                        Add to Cart
                    </Text>
                    <Text size='12px' color={colors.green}>
                        {availableCopies} Copies Available
                    </Text>
                </Col>
                <Text size='28px' fontWeight="300" color="white">
                    ${book.price}
                </Text>
            </AddToCartButtonWrap>
        )
    )
}

export default AvailableCopies;
