import PRODUCTS from '../../dummy-data';
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, updateProduct, UPDATE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts : PRODUCTS,
    userProducts : PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            const {title, description, price, imageUrl} = action.productData
            const newProduct = new Product(new Date().toString(), 'u1', title, imageUrl, description, price)
            return {
                ...state,
                userProducts: state.userProducts.concat(newProduct),
                availableProducts: state.availableProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const prodIdx = state.userProducts.findIndex(prod => prod.id === action.productId);
            const {productData} = action;
            const updatedProduct = new Product(action.productId, state.userProducts[prodIdx].ownerId, productData.title, productData.imageUrl, productData.description, state.userProducts[prodIdx].price)
            const updatedUserProducs = [...state.userProducts];
            updatedUserProducs[prodIdx] = updatedProduct;
            const prodIdxOfAvailableProds = state.availableProducts.findIndex(prod => prod.id === action.productId)
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[prodIdxOfAvailableProds] = updatedProduct;
            return {
                ...state,
                userProducts: updatedUserProducs,
                availableProducts: updatedAvailableProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(item => item.id !== action.id),
                availableProducts: state.availableProducts.filter(item => item.id !== action.id)
            }
    }
    return state;
}