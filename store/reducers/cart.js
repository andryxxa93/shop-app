import { ADD_TO_CART, REMOVE_ITEM } from "../actions/cart";
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            let newOrUpdatedCartItem;

            if (state.items[addedProduct.id]) {
                newOrUpdatedCartItem = new CartItem(
                        state.items[addedProduct.id].quantity + 1,
                        productPrice,
                        productTitle,
                        state.items[addedProduct.id].sum + productPrice
                )
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: newOrUpdatedCartItem
                    },
                    totalAmount: state.totalAmount + productPrice
                }
            } else {
                newOrUpdatedCartItem = new CartItem(1, productPrice, productTitle, productPrice)
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [addedProduct.id]: newOrUpdatedCartItem
                    },
                    totalAmount: state.totalAmount + productPrice
                }
            }
        case REMOVE_ITEM:
            const prodQty = state.items[action.productId].quantity;
            const selectedItem = state.items[action.productId]
            let updatedCartItems = {};
                if (prodQty > 1) {
                    const updatedCartItem = new CartItem(
                        selectedItem.quantity - 1,
                        selectedItem.productPrice,
                        selectedItem.productTitle,
                        selectedItem.sum - selectedItem.productPrice
                    )
                    updatedCartItems = {...state.items, [action.productId]: updatedCartItem}
                } else {
                    updatedCartItems = {...state.items};
                    delete updatedCartItems[action.productId];
                }
                return {
                    ...state,
                    items: {
                        ...updatedCartItems
                    },
                    totalAmount: state.totalAmount - selectedItem.productPrice
                }
        case ADD_ORDER:
            return initialState
        case DELETE_PRODUCT:
            if (!state.items[action.id]) {
                return state
            }
            const updatedItems = {...state.items}
            const itemTotal = state.items[action.id].sum;
            delete updatedItems[action.id]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }

    }
    return state
}

