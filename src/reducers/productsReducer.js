import * as types from '../actions/types';

const INIT_STATE = {
    products: [],
    productDetails: {
        name: '', price: 0
    },
    activeProductId: null
};

const ProductsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS_SUCCESSFUL:
            return {
                ...state,
                products: action.payload
            };

        case types.PUSH_PRODUCT_SUCCESSFUL:
            return {
                ...state,
                productDetails: {...state.productDetails, id: action.payload.id},
                activeProductId: action.payload.id
            };

        case types.UPDATE_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: {
                    ...state.productDetails,
                    [action.payload.field]: action.payload.value
                },
                activeProductId: parseInt(state.productDetails.id)
            };

        case types.DELETE_PRODUCT_SUCCESSFUL:
            return {
                ...state,
                products: state.products.filter(
                    product => product.id !== action.payload.id
                )
            };

        case types.SET_PRODUCT_ACTIVE:
            return {
                ...state,
                activeProductId: action.payload.id
            };

        case types.FETCH_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: state.products.filter(product => product.id === action.payload.id)[0]
            }
    }

    return state;
};

export default ProductsReducer;

